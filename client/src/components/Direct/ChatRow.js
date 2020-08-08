import React from 'react';

import Badge from './Badge';

import '../../styles/direct.css';

const prepareText = (str) => {
  if (!str) return 'No messages yet';

  if (str.length > 34) {
    return str.toString().substring(0, 36).concat('...');
  } else {
    return str;
  }
};

const ChatRow = ({
  chat_id,
  name,
  picture,
  latestMessage,
  unreadMessagesCount,
  openDialog,
  handleChatClick,
}) => {
  const className =
    name === openDialog
      ? 'CHAT_ROW__container CHAT_ROW__container_active'
      : 'CHAT_ROW__container';

  return (
    <div>
      <div className={className} onClick={handleChatClick.bind(null, chat_id)}>
        <div className='CHAT_ROW__left'>
          <img src={picture}></img>
        </div>
        <div className='CHAT_ROW__center'>
          <h4>{name}</h4>
          //TODO: Somehow get the name
          <h5>{prepareText(latestMessage?.context)}</h5>
        </div>
        <div className='CHAT_ROW__right'>
          <p>{latestMessage?.sendAt}</p>
          {unreadMessagesCount ? (
            <Badge
              size='smaller'
              status='danger'
              content={unreadMessagesCount}
            />
          ) : (
            ''
          )}
        </div>
      </div>
      <hr className='hr_chat'></hr>
    </div>
  );
};

export default ChatRow;
