import React from 'react';
import ResultCard from './ResultCard';
import { useSelector } from 'react-redux';

const SearchResult = ({ data }) => {
  const loggedInUser = useSelector((state) => state.loggedInUser);

  console.log({ data });

  const sortByProp = (arr, prop) => arr.sort((a, b) => b[prop] - a[prop]);

  return (
    <div className='SEARCH_RESULTS'>
      {sortByProp(data, 'matched').map((user) => (
        <ResultCard
          info={{
            username: user.username,
            fullname: user.fullname,
            occupation: user.occupation,
            picture: user.picture,
            location: user.based_in,
            matched: user.matched,
            interests: Object.values(user.interests),
          }}
        />
      ))}
    </div>
  );
};

export default SearchResult;
