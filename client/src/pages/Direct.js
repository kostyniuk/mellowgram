import React from 'react';

import Header from '../components/Header/Header';

import '../styles/direct.css';
import Chats from '../components/Direct/Chats';
import Messages from '../components/Direct/Messages';

const Direct = () => {
  return (
    <div className='DIRECT__page'>
      <Header />
      <div className='DIRECT__component'>
        <div className='DIRECT__left_side'>
          <Chats />
        </div>
        <div className='DIRECT__right_side'>
          <Messages />
        </div>
      </div>
    </div>
  );
};

export default Direct;
