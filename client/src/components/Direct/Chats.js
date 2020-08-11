import React from 'react';

import ChatRow from './ChatRow';

import '../../styles/direct.css';

const Chats = ({ chats, openDialog, handleChatClick, empty }) => {
  return (
    <div>
      {chats.map((chat) => (
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
