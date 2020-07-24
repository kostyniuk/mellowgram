import React from 'react';

import '../../../styles/btn.css'

function PostInput({ username, fullname, picture }) {
  return (
    <div>
      <div>
        <div className='POST__body'>
          <div className='POST__title'>
            <img src={picture} alt='avatar' className='POST__profile_picture' />
            <div className='POST__header'>
              <h3 className='POST__fullname'>{fullname}</h3>
              <h4 className='POST__username'>@{username}</h4>
            </div>
          </div>
          <div className='POST__context'>
            <textarea
              name='message'
              autoFocus
              id='message'
              rows='4'
              className='form-input'
            ></textarea>
            <button className='green'>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostInput;
