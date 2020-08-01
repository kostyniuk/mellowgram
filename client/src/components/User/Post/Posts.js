import React, { useEffect, useCallback, useState, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import InfiniteScroll from 'react-infinite-scroll-component';

import LikesModal from '../LikesModal';

import equal from 'deep-equal';

import useFetch from '../../../hooks/useFetch';

import {
  setPosts,
  loadMorePosts,
  setLikes,
  loadMoreLikes,
} from '../../../redux/actions';

import Post from './Post';
import PostInput from './PostInput';

import '../../../styles/posts.css';

import { sleep } from '../../../helpers/index';

const Posts = () => {
  const [hasMore, setHasMore] = useState(true);

  const [selectedLikes, setSelectedLikes] = useState(null);

  const dispatch = useDispatch();
  const { request } = useFetch();

  const currentPage = useSelector(
    (state) => state.currentPage,
    (prev, curr) => prev.id === curr.id
  );
  const loggedInUser = useSelector(
    (state) => state.loggedInUser,
    (prev, curr) => prev.id === curr.id
  );
  const posts = Object.values(
    useSelector(
      (state) => state.posts,
      (prev, curr) => {
        return equal(prev, curr);
      }
    )
  ).sort();

  const likes = useSelector(
    (state) => state.likes,
    (prev, curr) => {
      return equal(prev, curr);
    }
  );

  const [isParsed, setIsParsed] = useState(false);

  const offset = useRef(0);

  const loadLikes = async (arrOfPosts) => {
    const ids = arrOfPosts.map((post) => post.post_id);
    const requests = ids.map((id) => request(`/api/like/${id}`));
    const res = await Promise.all(requests);
    return res;
  };

  const loadPosts = useCallback(async () => {
    if (currentPage.id && !isParsed) {
      const res = await request(
        `/api/post/${currentPage.username}?limit=5&offset=0`
      );
      if (res.success) {
        setIsParsed(true);
        dispatch(setPosts({ posts: res.posts, user: currentPage.username }));
        const likes = await loadLikes(res.posts);
        dispatch(setLikes({ likes }));
      }
    }
  }, [dispatch, currentPage, isParsed, request, loadLikes]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts, dispatch, currentPage]);

  const fetchMoreData = async () => {
    offset.current += 5;
    const res = await request(
      `/api/post/${currentPage.username}?limit=5&offset=${offset.current}`
    );

    const likes = await loadLikes(res.posts);

    await sleep(300);

    if (!res.posts.length) {
      setHasMore(false);
      return;
    }

    dispatch(
      loadMorePosts({
        posts: res.posts,
      })
    );
    dispatch(loadMoreLikes({ likes }));
  };

  if (posts[posts.length - 1] !== currentPage.username) return <div></div>;

  if (!Object.keys(likes).length) return <div></div>;

  return (
    <div className='POSTS__container'>
      {currentPage.id === loggedInUser.id && (
        <PostInput
          picture={currentPage.picture}
          fullname={currentPage.fullname}
          username={currentPage.username}
        />
      )}

      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {posts
          .reverse()
          .slice(1)
          .map((post) => {
            return (
              <Post
                key={post.post_id}
                id={post.post_id}
                picture={currentPage.picture}
                fullname={currentPage.fullname}
                username={currentPage.username}
                text={post.caption}
                numberOfLikes={post.number_of_likes}
                postedAt={post.created_at}
                showSettings={currentPage.id === loggedInUser.id}
                likes={likes[post.post_id]}
                loggedInfo={{
                  user_id: loggedInUser.id,
                  username: loggedInUser.username,
                  picture: loggedInUser.picture,
                }}
                setSelectedLikes={setSelectedLikes}
              />
            );
          })}
      </InfiniteScroll>
      {selectedLikes && (
        <LikesModal setSelectedImg={setSelectedLikes} likes={selectedLikes} />
      )}
    </div>
  );
};

export default Posts;
