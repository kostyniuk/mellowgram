import React from 'react';
import { useSelector } from 'react-redux';

import '../../styles/followingBar.css';

const InterestBar = () => {
  const interests = useSelector((state) => state.currentPage.interests);

  if (!interests) return <div className='USER_INFO__followingBar'></div>;

  return (
    <div className='USER_INFO__followingBar'>
      <div className='INTEREST_BAR_CONTAINER'>
        <div className='INTEREST_BAR_TITLE'>
          <h3>Interests</h3>
        </div>
        <div className='INTEREST_BAR_BODY'>
          <ul>
            {interests.map((interest) => (
              <li
                style={{
                  backgroundColor: interest.interest_color,
                  opacity: '.8',
                  color: 'black',
                }}
              >{`${interest.interest_emoji} ${interest.interest_name}`}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InterestBar;
