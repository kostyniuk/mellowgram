import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import Message from './Message';

import '../../styles/messages.css';
import autosize from 'autosize';
const Messages = ({
  data,
  textInput,
  setOpenDialog,
  handleMessageSend,
  handleChange,
  empty,
}) => {
  const loggedInUser = useSelector((state) => state.loggedInUser);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
  };

  let handleKeyDown = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
    // In case you have a limitation
    e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
  }

  useEffect(() => {
        scrollToBottom()

    return () => {
      handleKeyDown = null;
      console.log('------killed-')

    }
      },
      [data?.messages?.length]);

  if (!data)
    return (
      <div className='MESSAGES__container'>
        <div ref={messagesEndRef} />
      </div>
    );


  console.log({messages: data.messages})

  return (
    <div className='MESSAGES__container'>
      <div className='MESSAGES__title'>
        <i
          className='fa fa-caret-left MESSAGES_back_button'
          onClick={() => setOpenDialog(null)}
        ></i>
        <h4>{data.username}</h4>
        <div className='MESSAGES_title_picture'>
          <img src={data.picture}></img>
        </div>
      </div>
      <div className='MESSAGES__body'>
        {data.messages.map((msg) => (
          <Message
            key={msg.id}
            type={msg.type}
            context={msg.text}
            isOwner={+msg.from === +loggedInUser.id}
            date={msg.date}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className='MESSAGES__send'>
        <div className='MESSASGES__send_input'>
        <textarea
          value={textInput}
          onChange={handleChange}
          name='message'
          autoFocus
          onKeyDown={handleKeyDown}
          className='form-input MESSAGES_INPUT'
        ></textarea>
        <i
          class='fa fa-paper-plane MESSAGES_SEND'
          onClick={handleMessageSend.bind(null, data.room_id, loggedInUser.id)}
        ></i>
        </div>
      </div>
    </div>
  );
};

export default Messages;
