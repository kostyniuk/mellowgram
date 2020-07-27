import React, { useEffect, useCallback, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import InfiniteScroll from 'react-infinite-scroll-component';

import equal from 'deep-equal';

import useFetch from '../../../hooks/useFetch';

import { setPosts, loadMorePosts } from '../../../redux/actions';

import Post from './Post';
import PostInput from './PostInput';

import '../../../styles/posts.css';

const Posts = () => {
  const hasMore = useState(true);

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
  );


      // useState = loaded : 20, 40, 60 -> limit, offset

  const loadPosts = useCallback(async () => {
    if (currentPage.id) {
      const res = await request(`/api/post/${currentPage.username}`);
      if (res.success) {
        dispatch(setPosts({ posts: res.posts, user: currentPage.username }));
      }
    }
  }, [dispatch, currentPage]);

  useEffect(() => {
    loadPosts();
    return () => 'UNMOUNTED';
  }, [loadPosts, dispatch, currentPage]);

  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      dispatch(
        loadMorePosts({
          posts: [
            {
              post_id: '18',
              caption: "Wow. That's nice",
              created_at: '15 hours ago',
              number_of_likes: 0,
            },
            {
              post_id: '17',
              caption: 'as',
              created_at: '15 hours ago',
              number_of_likes: 0,
            },
          ],
        })
      );
    }, 1500);
  };

  // last element is username of the user whom these posts belong to
  if (posts[posts.length - 1] !== currentPage.username) return <div></div>;

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
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {posts
          .reverse()
          .slice(1)
          .map((post) => {
            return (
              <Post
                id={post.post_id}
                picture={currentPage.picture}
                fullname={currentPage.fullname}
                username={currentPage.username}
                text={post.caption}
                numberOfLikes={post.number_of_likes}
                postedAt={post.created_at}
              />
            );
          })}
      </InfiniteScroll>
    </div>
  );
};

export default Posts;
