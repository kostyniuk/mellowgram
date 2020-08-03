import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import '../../styles/modal.css';
import { deleteFollow, addFollow } from '../../redux/actions';

const FollowRow = ({ id, username, picture, alreadyFollowed }) => {
  const [following, setFollowing] = useState(alreadyFollowed);

  const dispatch = useDispatch();

  let btnClassName = 'green';

  const followHandler = () => {
    console.log({ following, id });
    if (following) {
      dispatch(deleteFollow({ id }));
    } else {
      dispatch(addFollow({ id, picture, username }));
    }
    setFollowing((prev) => !prev);
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
