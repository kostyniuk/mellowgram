import React from 'react';

import { useSelector } from 'react-redux';

const ResultCard = () => {
  const currentPage = useSelector((state) => state.currentPage);
  const loggedInUser = useSelector((state) => state.loggedInUser);

  let { interests } = loggedInUser;

  interests = interests.slice(0, 6);

  console.log({ interests });

  if (!interests) return null;

  return (
    <div className='SEARCH_RESULT_CARD'>
      <div className='card'>
        <div className='card-header'>
          <div className='card-cover'></div>
          <img
            className='card-avatar'
            src={
              'http://localhost:3000/api/public/uploads/N6NCsEnf_6U9RvrfYNXpb.jpg'
            }
            alt='avatar'
          />
          <h1 className='card-fullname'>ads</h1>
          <h2 className='card-jobtitle'>adsdsa</h2>
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
              <h4 className='card-city'>Kyiv</h4>
            </div>
            <div className='card-number-match'>
              <h4>6/7</h4>
            </div>
          </div>
          <div className='card-interests'>
            <div className='INTEREST_BAR_TITLE'>
              {interests.length ? <h4>Interests</h4> : null}
            </div>
            <div className='INTEREST_BAR_BODY card-my-interests'>
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
            </div>
            <p className='card-contact' style={{ height: '30px' }}>
              And more...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
