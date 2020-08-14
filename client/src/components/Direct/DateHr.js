import React from 'react';

import '../../styles/hrCentered.css';

const DateHr = ({ date }) => {
  return (
    <div>
      <hr className='hr-centered-text' data-content={date}></hr>
    </div>
  );
};

export default DateHr;
