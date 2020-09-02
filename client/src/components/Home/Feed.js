import React, { useRef, useEffect, useCallback, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { useDispatch, useSelector } from 'react-redux';
import { setHomePosts } from '../../redux/actions';
import { sleep } from '../../helpers/index';

import InfiniteScroll from 'react-infinite-scroll-component';
import Post from '../User/Post/Post';

import '../../styles/home.css';
import LikesModal from '../User/Post/LikesModal';

const Feed = () => {
  const { request } = useFetch();
  const dispatch = useDispatch();

  let posts = Object.values(useSelector((state) => state.homePosts)).sort();
  const [hasMore, setHasMore] = useState(true);
  const [selectedLikes, setSelectedLikes] = useState(null);

  const offset = useRef(0);

  const loadLikes = useCallback(async (arrOfPosts) => {
    if (!arrOfPosts.length) return [];
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

  posts = posts.filter((el) => el !== true);
  if (!posts.length) return <div>Follow someone, to fill your feed</div>;

  return (
    <div>
      <div className='FEED_FOOTER'></div>
      <div className='FEED_CONTAINER'>
        <div className='FEED_SIDE'></div>
        <div className='POSTS__container'>
          <div className='FEED_CENTER'>
            {posts.length ? (
              <InfiniteScroll
                dataLength={posts.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
              >
                {posts.reverse().map((post) => {
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
        </div>
        <div className='FEED_SIDE'></div>
        {selectedLikes && (
          <LikesModal
            closeHandler={setSelectedLikes}
            info={selectedLikes}
            title='Likes'
          />
        )}
      </div>
      <div className='FEED_FOOTER'></div>
    </div>
  );
};
export default Feed;
