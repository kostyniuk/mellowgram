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
  deletePost,
} from '../../../redux/actions';

import Post from './Post';
import PostInput from './PostInput';

import '../../../styles/posts.css';

import { sleep } from '../../../helpers/index';
import EditModal from '../EditModal';

const Posts = () => {
  let same = useRef(true);

  const [hasMore, setHasMore] = useState(true);

  const [selectedLikes, setSelectedLikes] = useState(null);

  const [editModal, setEditModal] = useState(null);

  const dispatch = useDispatch();
  const { request } = useFetch();

  const currentPage = useSelector(
    (state) => state.currentPage,
    (prev, curr) => {
      same.current = equal(prev, curr);
      return equal(prev, curr);
    }
  );
  const loggedInUser = useSelector(
    (state) => state.loggedInUser,
    (prev, curr) => equal(prev, curr)
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

  const deletePostHandler = async (id) => {
    const responce = await request(`/api/post/${id}`, { method: 'DELETE' });

    if (responce.success) {
      dispatch(deletePost(id));
    }
  };

  const editPostHandler = (info) => {
    console.log('editing', info.id);
    setEditModal(info);
  };

  const [isParsed, setIsParsed] = useState(false);

  const offset = useRef(0);

  const loadLikes = useCallback(async (arrOfPosts) => {
    const ids = arrOfPosts.map((post) => post.post_id);
    const requests = ids.map((id) => request(`/api/like/${id}`));
    const res = await Promise.all(requests);
    return res;
  }, []);

  const loadPosts = useCallback(
    async (signal) => {
      if (currentPage.id && !isParsed) {
        const res = await request(
          `/api/post/${currentPage.username}?limit=5&offset=0`,
          {},
          signal
        );
        if (res.success) {
          setIsParsed(true);
          dispatch(setPosts({ posts: res.posts, user: currentPage.username }));
          const likes = await loadLikes(res.posts);
          dispatch(setLikes({ likes }));
        }
      }
    },
    [currentPage.id]
  );

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    if (!same.current) {
      loadPosts(signal);
    }

    return () => {
      abortController.abort();
    };
  }, [loadPosts]);

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
                deletePostHandler={deletePostHandler}
                editPostHandler={editPostHandler}
              />
            );
          })}
      </InfiniteScroll>
      {selectedLikes && (
        <LikesModal setSelectedImg={setSelectedLikes} likes={selectedLikes} />
      )}

      {editModal && <EditModal handleEdit={setEditModal} info={editModal} />}
    </div>
  );
};

export default Posts;
