import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import useFetch from '../../../hooks/useFetch';
import {
  onLike,
  decrementNumberOfLikes,
  incrementNumberOfLikes,
  OnLikePostHome,
} from '../../../redux/actions';
import LoginModal from '../Information/LoginModal';

const Post = ({
  id,
  picture,
  fullname,
  username,
  text,
  numberOfLikes,
  likes,
  postedAt,
  showSettings,
  setSelectedLikes,
  deletePostHandler,
  editPostHandler,
  type,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loggedInUser = useSelector((state) => state.loggedInUser);

  const { request } = useFetch();

  const [loginModal, setLoginModal] = useState(false);

  const [liked, setLiked] = useState(likes?.alreadyLiked);
  let likeButtonClasses = liked ? 'fa fa-heart liked' : 'fa fa-heart';

  useEffect(() => {
    setLiked(likes?.alreadyLiked);
  }, [likes]);

  const handleLike = async () => {
    if (!loggedInUser.isAuthenticated) return setLoginModal(true);

    const method = liked ? 'DELETE' : 'POST';

    const res = await request(`/api/like/${id}`, {
      method,
    });

    if (res?.success) {
      if (!type) {
        if (liked) {
          dispatch(decrementNumberOfLikes(id));
        } else {
          dispatch(incrementNumberOfLikes(id));
        }
        dispatch(onLike({ ...loggedInUser, id }));
      } else {
        dispatch(OnLikePostHome({ post: id, me: loggedInUser }));
      }
      setLiked((prev) => !prev);
    }
  };

  if (!likes) return <div></div>;

  return (
    <div>
      <div className='POST__body'>
        <div className='POST__title'>
          <div
            className='POST__title__left'
            onClick={() => history.push(`/${username}`)}
          >
            <img src={picture} alt='avatar' className='POST__profile_picture' />
            <div className='POST__header'>
              <h3 className='POST__fullname'>{fullname}</h3>
              <h4 className='POST__username'>@{username}</h4>
            </div>
          </div>
          {showSettings && (
            <div className='POST__title__right'>
              <i
                className='fa fa-remove'
                aria-hidden='true'
                style={{ color: 'red' }}
                onClick={deletePostHandler.bind(null, id)}
              ></i>
              <i
                className='fa fa-edit'
                aria-hidden='true'
                onClick={editPostHandler.bind(null, {
                  id,
                  picture,
                  username,
                  fullname,
                  text,
                })}
              ></i>
            </div>
          )}
        </div>
        <div className='POST__context'>
          <p>{text}</p>
          <div className='POST__actions'>
            <div className='POST__like_section'>
              <div className='POST__like_button'>
                <i
                  className={likeButtonClasses}
                  aria-hidden='true'
                  onClick={handleLike}
                ></i>
                {liked ? <h4>&#8203; Liked</h4> : <h4>&#8203; Like &#8203;</h4>}
              </div>
              <h4 className='POST_number_of_likes'>{numberOfLikes} Likes </h4>

              <div className='POST__liked_by'>
                <h4>Liked by: </h4>
                <div
                  className='POST__liked_by_images'
                  onClick={() => setSelectedLikes(likes)}
                >
                  <img
                    src={
                      likes.data.length
                        ? likes.data[0].picture
                        : '/api/public/uploads/blank.jpg'
                    }
                    alt='avatar'
                  />
                  <img
                    src={
                      likes.data.length > 1
                        ? likes.data[1].picture
                        : '/api/public/uploads/blank.jpg'
                    }
                    alt='avatar'
                  />
                  <img
                    src={
                      likes.data.length > 2
                        ? likes.data[2].picture
                        : '/api/public/uploads/blank.jpg'
                    }
                    alt='avatar'
                  />
                </div>
              </div>
            </div>
            <h4 className='POST__creation_time'>{postedAt}</h4>
          </div>
        </div>
      </div>
      {loginModal && <LoginModal closeHandler={setLoginModal} />}
      {/* <hr className='hr' /> */}
    </div>
  );
};

export default Post;
