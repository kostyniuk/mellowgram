import React from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';

import '../../../styles/followingBar.css';
import { useHistory } from 'react-router-dom';

const moveMatchedInterestsInfront = (interests, loggedInUser) => {
  const loggedInInterestsIds = loggedInUser.interests.map(interest => interest.interest_id);
  let commonInterests = _.filter(interests, interest => _.includes(loggedInInterestsIds, interest.interest_id))

  _.forEach(commonInterests, interest => interest.common = true);


  return Array.from(new Set(interests));
}

const moveMatchedLanguagesInfront = (languages, loggedInUser) => {
  const loggedInLanguagessIds = loggedInUser.languages.map(interest => interest.id);
  let commonLanguages = _.filter(languages, interest => _.includes(loggedInLanguagessIds, interest.id))

  _.forEach(commonLanguages, interest => interest.common = true);



  return Array.from(new Set(languages));
}

const InterestBar = () => {
  const history = useHistory();

  const currentPage = useSelector((state) => state.currentPage);
  const loggedInUser = useSelector((state) => state.loggedInUser);


  let { interests, languages } =
    currentPage.id === loggedInUser.id ? loggedInUser : currentPage;

  const redirectToSettings = () => {
    history.push('/account');
  };

  if (!interests || !languages) return <div className='USER_INFO__followingBar'></div>;

  return (
    <div className='USER_INFO__followingBar'>
      <div className='INTEREST_BAR_CONTAINER'>
        <div className='INTEREST_TAB__BAR_TITLE'>
          {interests.length || loggedInUser.id !== currentPage.id ? (
            <h3>Interests</h3>
          ) : null}
        </div>
        <div className='INTEREST_BAR_BODY'>
          {interests.length ? (
            <ul>
              {interests && moveMatchedInterestsInfront(interests, loggedInUser).map((interest) => (
                <li className={`INTEREST_BAR_BODY__INTEREST ${interest.common ? 'INTEREST_BAR_BODY__INTEREST__MATCHED' : ''}`}
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
      <div className='INTEREST_BAR_CONTAINER'>
        <div className='INTEREST_TAB__BAR_TITLE'>
          {languages.length || loggedInUser.id !== currentPage.id ? (
              <h3>Languages</h3>
          ) : null}
        </div>
        <div className='INTEREST_BAR_BODY'>
          {languages.length ? (
              <ul>
                {languages && moveMatchedLanguagesInfront(languages, loggedInUser).map((interest) => (
                    <li className={`INTEREST_BAR_BODY__INTEREST ${interest.common ? 'INTEREST_BAR_BODY__INTEREST__MATCHED' : ''}`}
                    >{interest.name}</li>
                ))}
              </ul>
          ) : null}
          {!languages.length && loggedInUser.id === currentPage.id && (
              <div className='INTEREST_BAR_NO_INTERESTS'>
                <h3>No languages yet</h3>
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
