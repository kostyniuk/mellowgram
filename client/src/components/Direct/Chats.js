import React from 'react';

import ChatRow from './ChatRow';

import '../../styles/direct.css';

const Chats = ({ chats, openDialog, handleChatClick }) => {
  return (
    <div>
      {chats.map((chat) => (
        <ChatRow
          key={chat.id}
          chat_id={chat.room_id}
          name={chat.username}
          picture={chat.picture}
          latestMessage={chat.latestMessage}
          unreadMessagesCount={chat.unread}
          openDialog={openDialog}
          handleChatClick={handleChatClick}
        />
      ))}
    </div>
  );
};

export default Chats;
