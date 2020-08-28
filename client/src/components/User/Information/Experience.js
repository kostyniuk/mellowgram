import React from 'react';
import ExpSingle from './ExpSingle';

const Experience = ({ experience }) => {
  return (
    <div className='card-timeline'>
      {experience.map((single) => {
        return <ExpSingle key={single.id} params={single} />;
      })}
    </div>
  );
};

export default Experience;
