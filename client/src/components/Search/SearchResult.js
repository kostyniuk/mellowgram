import React from 'react';
import ResultCard from './ResultCard';
import { useSelector } from 'react-redux';

const SearchResult = () => {
  const loggedInUser = useSelector((state) => state.loggedInUser);

  return (
    <div className='SEARCH_RESULTS'>
      <ResultCard
        info={{
          fullname: loggedInUser.fullname,
          occupation: loggedInUser.occupation,
          picture: loggedInUser.picture,
          location: loggedInUser.based_in,
          interests: loggedInUser.interests,
        }}
      />
    </div>
  );
};

export default SearchResult;
