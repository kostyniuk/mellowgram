import React from 'react';

import ChatRow from './ChatRow';

import '../../styles/direct.css';

const Chats = ({ chats, openDialog, setOpenDialog }) => {
  return (
    <div>
      {chats.map((chat) => (
        <ChatRow
          key={chat.id}
          chat_id={chat.room_id}
          name={chat.username}
          picture={chat.picture}
          latestMessage={chat.latestMessage}
          unreadMessagesCount={5}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      ))}
    </div>
  );
};

export default Chats;
