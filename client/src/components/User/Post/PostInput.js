import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import useFetch from '../../../hooks/useFetch';

import '../../../styles/btn.css';
import { addPost } from '../../../redux/actions';

function PostInput({ username, fullname, picture }) {
  const dispatch = useDispatch();

  const [caption, setCaption] = useState('');

  const { request } = useFetch();

  const submitHandler = async () => {
    const result = await request('/api/post/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ caption }),
    });

    setCaption('');

    if (result.success) {
      dispatch(addPost({ post: result.rows }));
    }
  };

  return (
    <div>
      <div>
        <div className='POST__body POSTINPUT '>
          <div className='POST__title'>
            <div className='POST__title__left'>
              <img
                src={picture}
                alt='avatar'
                className='POST__profile_picture'
              />
              <div className='POST__header'>
                <h3 className='POST__fullname'>{fullname}</h3>
                <h4 className='POST__username'>@{username}</h4>
              </div>
            </div>
          </div>
          <div className='POST__context'>
            <textarea
              value={caption}
              name='message'
              autoFocus
              id='message'
              rows='4'
              className='form-input'
              onChange={(e) => setCaption(e.target.value)}
            ></textarea>
            <button className='green' onClick={submitHandler}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostInput;
