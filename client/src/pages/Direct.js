import React, { useState, useEffect } from 'react';

import Header from '../components/Header/Header';

import '../styles/direct.css';
import Chats from '../components/Direct/Chats';
import Messages from '../components/Direct/Messages';

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
  {
    id: 3,
    name: 'tsunamipapi',
    picture:
      'http://localhost:3000/api/public/uploads/uxWTUo5M62aoDxkEO3hB7.jpeg',
    latestMessage: {
      id: 102,
      text: 'ngl you made it 😛😛😛ads adsdasdadsasda',
      sendAt: '17.06',
    },
    unreadMessagesCount: 1,
  },
];

const messages = [
  {
    username: 'dloading',
    picture: 'http://localhost:3000/api/public/uploads/user_dloading.jpg',
    messages: [
      { id: 1, from: 'dloading', text: 'STEPH MESSAGE 1', date: '3:22 am' },
      {
        id: 2,
        from: 'kostyniuk',
        text: 'DLOADING MESSAGE 2',
        date: '13:22 am',
      },
    ],
  },
  {
    username: 'steph',
    picture:
      'http://localhost:3000/api/public/uploads/N6NCsEnf_6U9RvrfYNXpb.jpg',
    messages: [
      { id: 1, from: 'steph', text: 'STEPH MESSAGE 1', date: '3:22 am' },
      {
        id: 2,
        from: 'kostyniuk',
        text: 'STEPH MESSAGE 1',
        date: '13:22 am',
      },
    ],
  },
  {
    username: 'tsunamipapi',
    picture:
      'http://localhost:3000/api/public/uploads/uxWTUo5M62aoDxkEO3hB7.jpeg',
    messages: [
      { id: 1, from: 'dloading', text: 'KELLY MESSAGE 1', date: '3:22 am' },
      {
        id: 2,
        from: 'kostyniuk',
        text: 'KELlY MESSAGE 1',
        date: '13:22 am',
      },
    ],
  },
  {
    username: 'kostyniuk',
    picture: 'http://localhost:3000/api/public/uploads/user_kostyniuk.jpg',
    messages: [
      { id: 1, from: 'dloading', text: 'STEPH MESSAGE 1', date: '3:22 am' },
      {
        id: 2,
        from: 'kostyniuk',
        text: 'DLOADING MESSAGE 2',
        date: '13:22 am',
      },
    ],
  },
];

const ws = new WebSocket('ws://localhost:5000');
const Direct = () => {
  const [openDialog, setOpenDialog] = useState(null);

  useEffect(() => {
    ws.onopen = () => {
      console.log('Connection established');
    };
    ws.onmessage = (evt) => {
      const message = evt.data;
      console.log('Got new message', message);
    };

    ws.onclose = () => {
      console.log('Connection closed');
    };
  }, []);

  return (
    <div className='DIRECT__page'>
      <Header />
      <div className='DIRECT__component'>
        <div className='DIRECT__left_side'>
          <Chats
            chats={chats}
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
          />
        </div>
        <div className='DIRECT__right_side'>
          <Messages
            data={
              openDialog
                ? messages.filter((msgs) => msgs.username === openDialog)[0]
                : null
            }
            setOpenDialog={setOpenDialog}
          />
        </div>
      </div>
    </div>
  );
};

export default Direct;
