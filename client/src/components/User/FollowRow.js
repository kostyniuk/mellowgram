import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import useFetch from './../../hooks/useFetch';
import { deleteFollow, addFollow } from '../../redux/actions';
import '../../styles/modal.css';

const FollowRow = ({ id, username, picture, alreadyFollowed }) => {
  const { request } = useFetch();
  const [following, setFollowing] = useState(alreadyFollowed);

  const dispatch = useDispatch();

  let btnClassName = 'green';

  const followHandler = async () => {
    console.log({ following, id });
    if (following) {
      const responce = await request(`/api/follow/${id}`, { method: 'DELETE' });
      console.log({ responce });
      if (responce.success) {
        dispatch(deleteFollow({ id }));
        setFollowing((prev) => !prev);
      }
    } else {
      const responce = await request(`/api/follow/${id}`, { method: 'POST' });
      console.log({ responce });
      if (responce.success) {
        dispatch(addFollow({ id, picture, username }));
        setFollowing((prev) => !prev);
      }
    }
  };

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
