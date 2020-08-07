import React, { useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';
import '../../styles/messages.css';
import Message from './Message';

const Messages = ({ data, setOpenDialog, socket }) => {
  const loggedInUser = useSelector(
    (state) => state.loggedInUser,
    (prev, curr) => prev === curr
  );

  const messagesEndRef = useRef(null);

  const [textInput, setTextInput] = useState('');

  const handleChange = (e) => {
    setTextInput(e.target.value);
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
  };

  // const prepareMessage = (from, to, chatRoom)

  useEffect(scrollToBottom, [data]);

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
          onChange={handleChange}
          name='message'
          autoFocus
          rows='1'
          className='form-input MESSAGES_INPUT'
        ></textarea>
        <i
          class='fa fa-paper-plane MESSAGES_SEND'
          onClick={() => socket.send(textInput)}
        ></i>
      </div>
    </div>
  );
};

export default Messages;
