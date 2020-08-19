import React, { useRef, useEffect, useCallback } from 'react';
import useFetch from '../../hooks/useFetch';
import { useDispatch, useSelector } from 'react-redux';
import { setHomePosts } from '../../redux/actions';

import InfiniteScroll from 'react-infinite-scroll-component';

const Feed = () => {
  const { request } = useFetch();
  const dispatch = useDispatch();

  const posts = Object.values(useSelector((state) => state.homePosts)).sort();

  console.log({ posts });

  const offset = useRef(0);

  const loadLikes = useCallback(async (arrOfPosts) => {
    const ids = arrOfPosts.map((post) => post.post_id);
    const requests = ids.map((id) => request(`/api/like/${id}`));
    const res = await Promise.all(requests);
    return res;
  }, []);

  const loadIntitialPosts = useCallback(async () => {
    const responce = await request(
      `/api/post/home?limit=10&offset=${offset.current}`
    );

    if (responce.success) {
      const likes = await loadLikes(responce.posts);
      dispatch(setHomePosts({ posts: responce.posts, likes }));
    }
  }, [request]);

  const fetchMoreData = async () => {
    offset.current += 5;
    const responce = await request(
      `/api/post/home?limit=10&offset=${offset.current}`
    );

    if (responce.success) {
      const likes = await loadLikes(res.posts);

      await sleep(300);

      if (!responce.posts.length) {
        setHasMore(false);
        return;
      }

      dispatch(
        loadMorePosts({
          posts: responce.posts,
          likes
        })
      );
    }
  };

  useEffect(() => {
    loadIntitialPosts();
  }, [loadIntitialPosts]);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Feed;
