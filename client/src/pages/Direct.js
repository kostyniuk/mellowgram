import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Header from '../components/Header/Header';
import Chats from '../components/Direct/Chats';
import Messages from '../components/Direct/Messages';

import '../styles/direct.css';

const Direct = ({
  textInput,
  dialog,
  openDialog,
  handleChatClick,
  handleChange,
  handleMessageSend,
  setOpenDialog,
}) => {
  const chats = Object.values(useSelector((state) => state.chats));
  const messages = Object.values(useSelector((state) => state.messages));

  useEffect(() => {
    setOpenDialog(null);
  }, []);

  if (!chats.length || !messages.length) return <div></div>;

  const notOpenSide = 'DIRECT_SIDE_NOT_ACTIVE';

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
            empty={chats[0] === true ? true : false}
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
            empty={messages[0] === true ? true : false}
          />
        </div>
      </div>
    </div>
  );
};

export default Direct;
