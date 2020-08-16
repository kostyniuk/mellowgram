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
      <p></p>
      <div className='FOLLOWING_BAR_USER__header'>
        <h3 className='FOLLOWING_BAR_USER__username'>{username}</h3>
      </div>
    </div>
  );
};

const InterestBar = ({ following, followedBy }) => {
  return (
    <div className='USER_INFO__followingBar'>
      <h3>Interests</h3>
    </div>
  );
};

export default InterestBar;
