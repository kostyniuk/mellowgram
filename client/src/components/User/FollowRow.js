import React from 'react';

import '../../styles/modal.css';

const FollowRow = ({ username, picture }) => {
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
            <button className='green'>Follow</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowRow;
