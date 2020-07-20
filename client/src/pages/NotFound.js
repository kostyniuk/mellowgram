import React from 'react';
import Header from '../components/Header/Header';

import '../styles/notFound.css';

const NotFound = ({ authorized }) => {
  return (
    <div className='nf'>
      <div>
        <Header authorized={authorized} />
      </div>
      <div className='not-available'>
        <h2> Sorry, this page isn't available.</h2>
        <div className='not-available-detail'>
          The link you followed may be broken, or the page may have been
          removed. &#8203;
          <a href='/'>Go back to Mellowgram.</a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
