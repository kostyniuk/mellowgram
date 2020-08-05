import React from 'react';

import Badge from './Badge';

import '../../styles/direct.css';

const prepareText = (str) => {
  if (str.length > 34) {
    return str.toString().substring(0, 36).concat('...');
  } else {
    return str;
  }
};

const ChatRow = ({ name, picture, latestMessage, unreadMessagesCount }) => {
  return (
    <div>
      <div className='CHAT_ROW__container'>
        <div className='CHAT_ROW__left'>
          <img src={picture}></img>
        </div>
        <div className='CHAT_ROW__center'>
          <h3>{name}</h3>
          <h5>{prepareText(latestMessage.text)}</h5>
        </div>
        <div className='CHAT_ROW__right'>
          <p>{latestMessage.sendAt}</p>
          <Badge size='smaller' status='danger' content={unreadMessagesCount} />
        </div>
      </div>
      <hr className='hr_chat'></hr>
    </div>
  );
};

export default ChatRow;
