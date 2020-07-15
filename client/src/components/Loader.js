import React from 'react';
import Login from '../pages/Login';

import '../styles/loader.css'

const Loader = (req, res, next) => {
  return (
    <div class='loader'>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default Loader;
