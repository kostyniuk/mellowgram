import React, { useEffect, useRef } from 'react';

import '../../styles/messages.css';
import PostInput from '../User/Post/PostInput';
import Message from './Message';

const Messages = () => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
  };

  const data = {
    username: 'dloading',
    picture: 'http://localhost:3000/api/public/uploads/user_dloading.jpg',
    messages: [
      { id: 1, from: 'dloading', text: 'Hi there', date: '3:22 am' },
      {
        id: 2,
        from: 'kostyniuk',
        text: 'Hi dasadsdsadasxzczxc',
        date: '13:22 am',
      },
      { id: 3, from: 'dloading', text: 'Hi ', date: '23:22' },
      { id: 4, from: 'dloading', text: 'daadsqweqwewq', date: '12.03' },
      { id: 5, from: 'kostyniuk', text: 'Hi', date: '2019' },
      { id: 6, from: 'kostyniuk', text: 'Hi there', date: 'Wed' },
      { id: 1, from: 'dloading', text: 'Hi there', date: '3:22 am' },
      {
        id: 2,
        from: 'kostyniuk',
        text: 'Hi dasadsdsadasxzczxc',
        date: '13:22 am',
      },
      { id: 3, from: 'dloading', text: 'Hi ', date: '23:22' },
      {
        id: 4,
        from: 'dloading',
        text:
          'daadssadddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddqweqwewq',
        date: '12.03',
      },
      {
        id: 5,
        from: 'kostyniuk',
        text:
          'Hiasdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
        date: '2019',
      },
      { id: 6, from: 'kostyniuk', text: 'Hi there', date: 'Wed' },
      { id: 1, from: 'dloading', text: 'Hi there', date: '3:22 am' },
      {
        id: 2,
        from: 'kostyniuk',
        text: 'Hi dasadsdsadasxzczxc',
        date: '13:22 am',
      },
      { id: 3, from: 'dloading', text: 'Hi ', date: '23:22' },
      { id: 4, from: 'dloading', text: 'daadsqweqwewq', date: '12.03' },
      { id: 5, from: 'kostyniuk', text: 'Hi', date: '2019' },
      { id: 6, from: 'kostyniuk', text: 'Hi there', date: 'Wed' },
    ],
  };

  useEffect(scrollToBottom, [data]);

  return (
    <div className='MESSAGES__container'>
      <div className='MESSAGES__title'>
        <i className='fa fa-caret-left MESSAGES_back_button'></i>
        <h4>{data.username}</h4>
        <div className='MESSAGES_title_picture'>
          <img src={data.picture}></img>
        </div>
      </div>
      <div className='MESSAGES__body'>
        {data.messages.map((msg) => (
          <Message context={msg.text} isOwner={msg.from === 'kostyniuk'} />
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
