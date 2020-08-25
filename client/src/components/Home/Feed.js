import React, { useRef, useEffect, useCallback, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { useDispatch, useSelector } from 'react-redux';
import { setHomePosts } from '../../redux/actions';
import { sleep } from '../../helpers/index';

import InfiniteScroll from 'react-infinite-scroll-component';
import Post from '../User/Post/Post';

import '../../styles/home.css';
import LikesModal from '../User/LikesModal';

const Feed = () => {
  const { request } = useFetch();
  const dispatch = useDispatch();

  const posts = Object.values(useSelector((state) => state.homePosts)).sort();
  const [hasMore, setHasMore] = useState(true);
  const [selectedLikes, setSelectedLikes] = useState(null);

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
    offset.current += 10;
    const responce = await request(
      `/api/post/home?limit=5&offset=${offset.current}`
    );

    if (responce.success) {
      const likes = await loadLikes(responce.posts);

      await sleep(300);

      if (!responce.posts.length) {
        setHasMore(false);
        return;
      }

      dispatch(
        setHomePosts({
          posts: responce.posts,
          likes,
        })
      );
    }
  };

  useEffect(() => {
    loadIntitialPosts();
  }, [loadIntitialPosts]);

  if (!posts.length) return null;

  return (
    <div className='FEED_CONTAINER'>
      <div className='FEED_SIDE'>
        <h3>Recomendations</h3>
        <hr></hr>
      </div>
      <div className='POSTS__container'>
        {posts.length ? (
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
                    picture={post.creatorInfo.picture}
                    username={post.creatorInfo.username}
                    fullname={post.creatorInfo.fullname}
                    text={post.caption}
                    numberOfLikes={post.number_of_likes}
                    postedAt={post.created_at}
                    likes={post.likes}
                    type='feed'
                    setSelectedLikes={setSelectedLikes}
                    // setSelectedLikes={setSelectedLikes}
                  />
                );
              })}
          </InfiniteScroll>
        ) : null}
      </div>
      <div className='FEED_SIDE'>
        <h3>Mypage</h3>
        <hr></hr>
      </div>
      {selectedLikes && (
        <LikesModal
          closeHandler={setSelectedLikes}
          info={selectedLikes}
          title='Likes'
        />
      )}
    </div>
  );
};
export default Feed;
