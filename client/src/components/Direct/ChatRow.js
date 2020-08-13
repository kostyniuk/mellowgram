import React from 'react';

import { useSelector } from 'react-redux';

import Badge from './Badge';

import '../../styles/direct.css';

import { prepareText, adjustTime } from '../../helpers/msg';

const ChatRow = ({
  chat_id,
  person_id,
  name,
  picture,
  latestMessage,
  unreadMessagesCount,
  openDialog,
  handleChatClick,
  empty,
}) => {
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const onlineUsers = useSelector((state) => state.onlineUsers);

  const className =
    name === openDialog
      ? 'CHAT_ROW__container CHAT_ROW__container_active'
      : 'CHAT_ROW__container';

  if (empty)
    return (
      <div>
        <p>You have no chats</p>
      </div>
    );

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
            {loggedInUser.id === latestMessage?.sender_id && 'You: '}
            {prepareText(latestMessage?.context)}
          </h5>
        </div>
        <div className='CHAT_ROW__right'>
          <p>
            {latestMessage?.send_at === 'now'
              ? 'now'
              : adjustTime(latestMessage?.send_at)}
          </p>
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
