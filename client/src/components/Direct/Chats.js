import React from 'react';

import ChatRow from './ChatRow';

import '../../styles/direct.css';

const Chats = () => {
  const chats = [
    {
      id: 1,
      name: 'steph',
      picture:
        'http://localhost:3000/api/public/uploads/N6NCsEnf_6U9RvrfYNXpb.jpg',
      latestMessage: {
        id: 100,
        text: 'Hi kostyniuk',
        sendAt: 'Fri',
      },
      unreadMessagesCount: 10,
    },
    {
      id: 2,
      name: 'dloading',
      picture: 'http://localhost:3000/api/public/uploads/user_dloading.jpg',
      latestMessage: {
        id: 101,
        text: 'lol 😂😂😂😂😂😂 sadsdada ssssssssdas sssss  ssssssss',
        sendAt: '14:14 pm',
      },
      unreadMessagesCount: 0,
    },
    {
      id: 3,
      name: 'kostyniuk',
      picture: 'http://localhost:3000/api/public/uploads/user_kostyniuk.jpg',
      latestMessage: {
        id: 102,
        text: 'ngl you made it 😛😛😛ads adsdasdadsasda',
        sendAt: '17.06',
      },
      unreadMessagesCount: 1,
    },
  ];

  return (
    <div>
      {chats.map((chat) => (
        <ChatRow
          key={chat.id}
          name={chat.name}
          picture={chat.picture}
          latestMessage={chat.latestMessage}
          unreadMessagesCount={chat.unreadMessagesCount}
        />
      ))}
    </div>
  );
};

export default Chats;
