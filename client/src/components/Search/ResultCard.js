import React from 'react';

import { useHistory } from 'react-router-dom';

import { adjustInterests } from '../../helpers/search';

const ResultCard = ({ info }) => {
  const history = useHistory();

  const {
    fullname,
    occupation,
    picture,
    location,
    interests,
    username,
    matched,
  } = info;
  const showActivities = 5;
  const adjustedInterests = adjustInterests(interests, showActivities);

  const handleRedirect = () => history.push(`/${username}`);

  return (
    <div className='SEARCH_RESULT_CARD'>
      <div className='card'>
        <div className='card-header'>
          <div className='card-cover'></div>
          <img
            className='card-avatar SEARCH_RESULT_PICTURE'
            src={picture}
            alt='avatar'
            onClick={handleRedirect}
          />
          <h1
            className='card-fullname SEARCH_RESULT_FULLNAME'
            onClick={handleRedirect}
          >
            {fullname}
          </h1>
          <h2 className='card-username' onClick={handleRedirect}>
            @{username}
          </h2>
          <h2 className='card-jobtitle'>{occupation}</h2>
        </div>
        <div className='SEARCH_CARD'>
          <div className='card-title'>
            <div className='card-location card-contact'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z' />
                <circle cx='12' cy='10' r='3' />
              </svg>
              <h4 className='card-city'>{location.split(',')[0]}</h4>
            </div>
            <div className='card-number-match'>
              <h4>{matched} matched</h4>
            </div>
          </div>
          <div className='card-interests'>
            <div className='INTEREST_BAR_TITLE'>
              {adjustedInterests.length ? <h4>Interests</h4> : null}
            </div>
            <div className='INTEREST_BAR_BODY card-my-interests'>
              {adjustedInterests.length ? (
                <ul>
                  {adjustedInterests.map((interest) => (
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
            </div>
            {interests.length > showActivities && (
              <p
                className='card-contact SEARCH_AND_MORE'
                style={{ height: '30px' }}
              >
                And more...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
