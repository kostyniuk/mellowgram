import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import equal from 'deep-equal';
import Header from '../components/Header/Header';

import '../styles/direct.css';
import Chats from '../components/Direct/Chats';
import Messages from '../components/Direct/Messages';
import { getChats, getMessages } from '../redux/actions';


// const ws = new WebSocket(`ws://localhost:5000`);
const ws = new WebSocket(`wss://mellowgram.herokuapp.com/`);
const Direct = () => {
  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(null);
  const chats = Object.values(
    useSelector(
      (state) => state.chats,
      (prev, curr) => equal(prev, curr)
    )
  );
  const messages = Object.values(
    useSelector(
      (state) => state.messages,
      (prev, curr) => equal(prev, curr)
    )
  );

  const loggedInUser = useSelector(
    (state) => state.loggedInUser,
    (prev, curr) => equal(prev, curr)
  );

  useEffect(() => {
    ws.onopen = () => {
      console.log('Connection established');
    };
    ws.onmessage = (evt) => {
      const message = JSON.parse(evt.data);
      const { action } = message;
      switch (action) {
        case 'GET_CHATS':
          console.log({ message });
          dispatch(
            getChats({
              chats: message.payload.rooms,
            })
          );
          dispatch(
            getMessages({
              messages: message.payload.messages,
              chats: message.payload.rooms,
            })
          );
          break;

        default:
          break;
      }
    };

    if (!chats.length) {
      ws.send(JSON.stringify({ action: 'GET_CHATS', id: loggedInUser.id }));
    }

    ws.onclose = () => {
      console.log('Connection closed');
    };
  }, []);

  if (!chats.length || !messages.length) return <div></div>;

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
                ? messages.filter((msgs) => +msgs.room_id === +openDialog)[0]
                : null
            }
            socket={ws}
            setOpenDialog={setOpenDialog}
          />
        </div>
      </div>
    </div>
  );
};

export default Direct;
