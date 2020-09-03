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
  const chats = useSelector((state) => state.chats);
  const messages = useSelector((state) => state.messages);

  useEffect(() => {
    setOpenDialog(null);
  }, []);

  console.log({ chats, messages });

  if (!chats.ready || !messages.ready) return <div></div>;

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
            chats={Object.values(chats).filter(
              (chat) => typeof chat === 'object'
            )}
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
                ? Object.values(messages)
                    .filter((msgs) => typeof msgs === 'object')
                    .filter((msgs) => +msgs.room_id === +openDialog)[0]
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
