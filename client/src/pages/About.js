import React from 'react';
import Header from '../components/Header/Header';

const About = ({ authorized }) => {
  return (
    <div>
      <Header authorized={authorized} />
      About page
    </div>
  );
};

export default About;
