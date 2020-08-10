import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import equal from 'deep-equal';
import Header from '../components/Header/Header';

import '../styles/direct.css';
import Chats from '../components/Direct/Chats';
import Messages from '../components/Direct/Messages';
import {
  getChats,
  getMessages,
  setUuid,
  addMessage,
  resetUnreadCounter,
} from '../redux/actions';

// const ws = new WebSocket(`ws://localhost:5000`);
// const ws = new WebSocket(`wss://mellowgram.herokuapp.com/`);
const Direct = ({
  textInput,
  dialog,
  openDialog,
  handleChatClick,
  handleChange,
  handleMessageSend,
  setOpenDialog,
}) => {
  const dispatch = useDispatch();

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

  if (!chats.length || !messages.length) return <div></div>;

  const notOpenSide = 'DIRECT_SIDE_NOT_ACTIVE';

  console.log({ dialog });

  return (
    <div className='DIRECT__page'>
      <Header />
      <div className='DIRECT__component'>
        <div
          className={
            dialog ? `DIRECT__left_side ${notOpenSide}` : 'DIRECT__left_side'
          }
        >
          <Chats
            chats={chats}
            openDialog={openDialog}
            handleChatClick={handleChatClick}
          />
        </div>
        <div
          className={
            dialog ? 'DIRECT__right_side' : `DIRECT__right_side ${notOpenSide}`
          }
        >
          <Messages
            data={
              openDialog
                ? messages.filter((msgs) => +msgs.room_id === +openDialog)[0]
                : null
            }
            textInput={textInput}
            handleMessageSend={handleMessageSend}
            handleChange={handleChange}
            setOpenDialog={setOpenDialog}
          />
        </div>
      </div>
    </div>
  );
};

export default Direct;
