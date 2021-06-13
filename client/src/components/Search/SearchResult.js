import React from 'react';

import ResultCard from './ResultCard';

import { sortByProp } from '../../helpers';

const SearchResult = ({ data, showMatched, myInterests, distingMatched }) => {

  console.log({myInterests})

  // const selectedIds = selected.map(
  //     (interest) => interest.id || interest.interest_id
  // );
  // const filtered = obtained.filter((outInterest) => {
  //   console.log({ outInterest, selectedIds });
  //   return selectedIds.includes(outInterest.interest_id);
  // });

  console.log({data})

  return (
    <div className='SEARCH_RESULTS'>
      {data.map((user) => (
        <ResultCard
          info={{
            username: user.username,
            fullname: user.fullname,
            age: user.age || '',
            occupation: user.occupation,
            picture: user.picture,
            location: user.based_in,
            matched: distingMatched(myInterests, Object.values(user.interests)).data.length,
            interests: Object.values(user.interests),
          }}
          showMatched={showMatched}
        />
      ))}
    </div>
  );
};

export default SearchResult;
