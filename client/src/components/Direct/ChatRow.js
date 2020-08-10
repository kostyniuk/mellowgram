import React from 'react';

import { useSelector } from 'react-redux';

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
  person_id,
  name,
  picture,
  latestMessage,
  unreadMessagesCount,
  openDialog,
  handleChatClick,
}) => {
  const loggedInUser = useSelector(
    (state) => state.loggedInUser,
    (prev, curr) => prev.id === curr.id
  );

  const onlineUsers = useSelector((state) => state.onlineUsers);

  const className =
    name === openDialog
      ? 'CHAT_ROW__container CHAT_ROW__container_active'
      : 'CHAT_ROW__container';

  console.log({ onlineUsers, person_id });

  return (
    <div>
      <div className={className} onClick={handleChatClick.bind(null, chat_id)}>
        <div className='CHAT_ROW__left'>
          <img src={picture}></img>
        </div>
        <div className='CHAT_ROW__center'>
          <div className='CHAT_ROW_TITLE'>
            <h4>{name}</h4>
            {onlineUsers.ids.includes(person_id.toString()) ? (
              <i className='fa fa-circle CHAT_ROW_ONLINE'></i>
            ) : (
              ''
            )}
          </div>
          <h5>
            {loggedInUser.id === latestMessage.sender_id && 'You: '}
            {prepareText(latestMessage?.context)}
          </h5>
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
