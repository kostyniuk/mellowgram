import React from 'react';

const ExpSingle = ({ params }) => {
  const { year, company, profession, achievements } = params;
  return (
    <div className='card-item' data-year={year}>
      <div className='card-item-title'>
        {profession} <span>{company}</span>
      </div>
      <div className='card-item-desc'>{achievements}</div>
    </div>
  );
};

export default ExpSingle;
