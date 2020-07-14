import React from 'react';
import Signup from '../pages/Signup';
import '../styles/loginInput.css';

const SignupInput = () => {
  return (
    <div className='containerInput'>
      <div className='image'>
        <h1>
          Welcome To <span>Mellowgram</span>
        </h1>
      </div>
      <div className='content'>
        <h3>Sign up to meet new friends.</h3>
        <div className='login'>Login with</div>
        <div className='links links-signup'>
          <div className='google'>
            <i className='fa fa-google'>
              <span>Google</span>
            </i>
          </div>
          <div className='facebook'>
            <i className='fa fa-facebook-f'>
              <span>Facebook</span>
            </i>
          </div>
          <div className='instagram' onClick={() => console.log('instagram')}>
            <i className='fa fa-instagram'>
              <span>Instagram</span>
            </i>
          </div>
        </div>
        <span >OR</span>
        <div className='form-group form-group-signup'>
          <label>Email</label>
          <br />
          <input
            type='text'
            className='form-control'
            name='email'
            id='txt'
            aria-describedby='helpId'
          />
        </div>
        <div className='form-group'>
          <label>Full Name</label>
          <br />
          <input type='text' className='form-control' name='fullName' id='txt' />
        </div>
        <div className='form-group'>
          <label>Username</label>
          <br />
          <input type='text' className='form-control' name='userName' id='txt' />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <br />
          <input type='text' className='form-control' name='password' id='txt' />
        </div>
 
        <button type='button' className='btn'>
          <a href='index.html'>Sign up</a>
        </button>
        <div className='signup signup-signup'>
          Have an account? &#8203;
          <a href='/login'>Log in</a>
        </div>
      </div>
    </div>
  );
};

export default SignupInput;
