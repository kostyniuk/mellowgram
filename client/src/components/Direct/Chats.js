import React from 'react';

import ChatRow from './ChatRow';

import '../../styles/direct.css';

const Chats = ({ chats, openDialog, setOpenDialog }) => {
  return (
    <div>
      {chats.map((chat) => (
        <ChatRow
          key={chat.id}
          name={chat.name}
          picture={chat.picture}
          latestMessage={chat.latestMessage}
          unreadMessagesCount={chat.unreadMessagesCount}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      ))}
    </div>
  );
};

export default Chats;
