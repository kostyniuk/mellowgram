import React from 'react';
import { useSelector } from 'react-redux';

import '../../../styles/followingBar.css';
import { useHistory } from 'react-router-dom';

const InterestBar = () => {
  const history = useHistory();

  const currentPage = useSelector((state) => state.currentPage);
  const loggedInUser = useSelector((state) => state.loggedInUser);

  const { interests } =
    currentPage.id === loggedInUser.id ? loggedInUser : currentPage;

  const redirectToSettings = () => {
    history.push('/account');
  };

  if (!interests) return <div className='USER_INFO__followingBar'></div>;

  return (
    <div className='USER_INFO__followingBar'>
      <div className='INTEREST_BAR_CONTAINER'>
        <div className='INTEREST_BAR_TITLE'>
          {interests.length || loggedInUser.id !== currentPage.id ? (
            <h3>Interests</h3>
          ) : null}
        </div>
        <div className='INTEREST_BAR_BODY'>
          {interests.length ? (
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
          ) : null}
          {!interests.length && loggedInUser.id === currentPage.id && (
            <div className='INTEREST_BAR_NO_INTERESTS'>
              <h3>No interests yet</h3>
              <i
                class='fa fa-plus'
                aria-hidden='true'
                onClick={redirectToSettings}
              ></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterestBar;
