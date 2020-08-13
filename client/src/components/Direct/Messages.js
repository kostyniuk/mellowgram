import React, { useEffect, useRef, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import '../../styles/messages.css';
import Message from './Message';

import { resetUnreadCounter } from '../../redux/actions';

const Messages = ({
  data,
  textInput,
  setOpenDialog,
  handleMessageSend,
  handleChange,
  empty,
}) => {
  const dispatch = useDispatch();

  const loggedInUser = useSelector(
    (state) => state.loggedInUser,
    (prev, curr) => prev === curr
  );

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
  };

  useEffect(scrollToBottom, [data?.messages?.length]);

  console.log({ empty, data });

  useEffect(() => {
    if (data) {
      dispatch(resetUnreadCounter({chatId: data.room_id}));
    }
  }, [data?.room_id]);

  if (!data)
    return (
      <div className='MESSAGES__container'>
        <div ref={messagesEndRef} />
      </div>
    );

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
            context={msg.text}
            isOwner={+msg.from === +loggedInUser.id}
            date={msg.date}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className='MESSAGES__send'>
        <textarea
          value={textInput}
          onChange={handleChange}
          name='message'
          autoFocus
          rows='1'
          className='form-input MESSAGES_INPUT'
        ></textarea>
        <i
          class='fa fa-paper-plane MESSAGES_SEND'
          onClick={handleMessageSend.bind(null, data.room_id, loggedInUser.id)}
        ></i>
      </div>
    </div>
  );
};

export default Messages;
