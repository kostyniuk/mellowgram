import React from 'react';

import '../../styles/toast.css';

const ToastNewMsg = ({ username, picture, context }) => {
  return (
    <div className='toast_container'>
      <div className='toast_title'>
        <img src={picture} className='toast__img'></img>
        <h3>{username}</h3>
      </div>
      <div className='toast_message'>
        <p>{context}</p>
      </div>
    </div>
  );
};

export default ToastNewMsg;
