import React from 'react';

import ResultCard from './ResultCard';

import { sortByProp } from '../../helpers';

const SearchResult = ({ data }) => {
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
