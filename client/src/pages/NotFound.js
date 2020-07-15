import React from 'react';
import Header from '../components/Header';

const NotFound = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <h2>Sorry, this page isn't available.</h2>
      <div className='detail'>
      The link you followed may be broken, or the page may have been removed. &#8203;
          <a href='/'>Go back to Instagram.</a>
        </div>
    </div>
  );
};

export default NotFound;
