import React from 'react';

import ChatRow from './ChatRow';

import { sortChatsByLatestMessage } from '../../helpers';

import '../../styles/direct.css';

const Chats = ({ chats, openDialog, handleChatClick, empty }) => {
  const emptyChats = chats.filter((element) => !element.latestMessage);
  const notEmpty = chats.filter((element) => element.latestMessage);

  notEmpty.sort(sortChatsByLatestMessage);

  const allChats = [...notEmpty, ...emptyChats];

  return (
    <div>
      {allChats.map((chat) => (
        <ChatRow
          key={chat.id}
          chat_id={chat.room_id}
          name={chat.username}
          person_id={chat.person_id}
          picture={chat.picture}
          latestMessage={chat.latestMessage}
          unreadMessagesCount={chat.unread}
          openDialog={openDialog}
          handleChatClick={handleChatClick}
          empty={empty}
        />
      ))}
    </div>
  );
};

export default Chats;
