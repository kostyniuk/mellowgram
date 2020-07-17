import React from 'react';
import ExpSingle from './ExpSingle';

const Experience = ({ experience }) => {
  return (
    <div class='card-timeline'>
      {experience.map((single) => {
        return <ExpSingle key='id' params={single} />;
      })}
    </div>
  );
};

export default Experience;
