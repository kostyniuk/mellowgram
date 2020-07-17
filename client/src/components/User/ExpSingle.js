import React from 'react';

const ExpSingle = ({ params }) => {
  const { year, company, profession, achievements } = params;
  return (
    <div class='card-item' data-year={year}>
      <div class='card-item-title'>
        {profession} <span>{company}</span>
      </div>
      <div class='card-item-desc'>{achievements}</div>
    </div>
  );
};

export default ExpSingle;
