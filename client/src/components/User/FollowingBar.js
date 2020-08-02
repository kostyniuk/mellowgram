import React from 'react';

import '../../styles/followingBar.css';

import { useHistory } from 'react-router-dom';

const UserRow = ({ picture, username }) => {
  const history = useHistory();

  const handleClickLink = () => {
    return history.push(`${username}`);
  };

  return (
    <div className='FOLLOWING_BAR_USER' onClick={handleClickLink}>
      <img
        src={picture}
        alt='avatar'
        className='FOLLOWING_BAR_USER_profile_picture'
        style={{ marginTop: '0px' }}
      />
      <div className='FOLLOWING_BAR_USER__header'>
        <h3 className='FOLLOWING_BAR_USER__username'>{username}</h3>
      </div>
    </div>
  );
};

function FollowingBar({ following, followedBy }) {
  // console.log({ following, followedBy });

  return (
    <div className='USER_INFO__followingBar'>
      <div className='FOLLOWING_BAR_FOLLOWED_BY'>
        <h3>followed by</h3>
        <div className='FOLLOWED_BAR_BODY'>
          {followedBy.users.map((user, i) => (
            <UserRow key={i} username={user.username} picture={user.picture} />
          ))}
        </div>
      </div>
      <div className='FOLLOWING_BAR_FOLLOWING'>
        <h3>following</h3>
        <div className='FOLLOWING_BAR_BODY'>
          {following.users.map((user, i) => (
            <UserRow key={i} username={user.username} picture={user.picture} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FollowingBar;
