import React, { useEffect, useRef } from 'react';

import '../../styles/messages.css';
import Message from './Message';

const Messages = ({ data, setOpenDialog }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
  };

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
            context={msg.text}
            isOwner={msg.from === 'kostyniuk'}
            date={msg.date}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className='MESSAGES__send'>
        <textarea
          name='message'
          autoFocus
          rows='1'
          className='form-input MESSAGES_INPUT'
        ></textarea>
        <i class='fa fa-paper-plane MESSAGES_SEND'></i>
      </div>
    </div>
  );
};

export default Messages;
