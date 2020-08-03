import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import equal from 'deep-equal';
import useFetch from './../../hooks/useFetch';
import { deleteFollow, addFollow } from '../../redux/actions';
import '../../styles/modal.css';

const FollowRow = ({ id, username, picture, alreadyFollowed }) => {
  const { request } = useFetch();
  const [following, setFollowing] = useState(alreadyFollowed);

  const loggedInUser = useSelector(
    (state) => state.loggedInUser,
    (prev, curr) => equal(prev, curr)
  );

  const dispatch = useDispatch();

  const followHandler = async () => {
    console.log({ following, id });
    if (following) {
      const responce = await request(`/api/follow/${id}`, { method: 'DELETE' });
      if (responce.success) {
        dispatch(
          deleteFollow({
            producer: {
              id: loggedInUser.id,
              username: loggedInUser.username,
              picture: loggedInUser.picture,
            },
            consumer: { id, picture, username },
          })
        );
        setFollowing((prev) => !prev);
      }
    } else {
      const responce = await request(`/api/follow/${id}`, { method: 'POST' });
      if (responce.success) {
        dispatch(
          addFollow({
            producer: {
              id: loggedInUser.id,
              username: loggedInUser.username,
              picture: loggedInUser.picture,
            },
            consumer: { id, picture, username },
          })
        );
        setFollowing((prev) => !prev);
      }
    }
  };

  let btnClassName = 'green';

  if (following) btnClassName += ' LIKESMODAL_BTN_followed';

  return (
    <div className='LIKESMODAL_ROW'>
      <div className='LIKESMODAL__title'>
        <div className='LIKESMODAL__title__left'>
          <img
            src={picture}
            alt='avatar'
            className='LIKESMODAL__profile_picture'
            style={{ marginTop: '0px' }}
          />
          <div className='LIKESMODAL__header'>
            <h3 className='LIKESMODAL__fullname'>{username}</h3>
          </div>
        </div>
        {true && (
          <div className='LIKESMODAL__title__right'>
            <button className={btnClassName} onClick={followHandler}>
              {following ? 'Following' : 'Follow'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowRow;
