import React, { useEffect, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import equal from 'deep-equal';

import useFetch from '../../../hooks/useFetch';

import { setPosts } from '../../../redux/actions';

import Post from './Post';
import PostInput from './PostInput';

import '../../../styles/posts.css';

const Posts = () => {
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

  const loadPosts = useCallback(async () => {
    if (currentPage.id && Object.keys(posts).length === 0) {
      const res = await request(`/api/post/${currentPage.username}`);
      if (res.success) {
        dispatch(setPosts({ posts: res.posts }));
      }
    }
  }, [dispatch, currentPage]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts, dispatch]);

  return (
    <div className='POSTS__container'>
      {currentPage.id === loggedInUser.id && (
        <PostInput
          picture='http://localhost:3000/api/public/uploads/N6NCsEnf_6U9RvrfYNXpb.jpg'
          fullname='Steph Curry'
          username='steph'
        />
      )}
      {posts.reverse().map((post) => {
        return (
          <Post
            id={post.post_id}
            picture={currentPage.picture}
            fullname={currentPage.fullname}
            username={currentPage.username}
            text={post.caption}
            numberOfLikes={post.numberOfLikes}
            postedAt={post.created_at}
          />
        );
      })}
    </div>
  );
};

export default Posts;
