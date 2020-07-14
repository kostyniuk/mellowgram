import React from 'react';

import '../styles/loginInput.css';

const LoginInput = () => {
  return (
    <div class='containerInput'>
      <div class='image'>
        <h1>
          Welcome To <span>Mellowgram</span>
        </h1>
      </div>
      <div class='content'>
        <h1>Login</h1>
        <div class='form-group'>
          <label>Username</label>
          <br />
          <input
            type='text'
            class='form-control'
            name=''
            id='txt'
            aria-describedby='helpId'
          />
        </div>
        <div class='form-group'>
          <label>Password</label>
          <br />
          <input type='password' class='form-control' name='' id='txt' />
        </div>
        <a class='fp' href='index.html'>
          Forgot Password?
        </a>
        <br />
        <button type='button' class='btn'>
          <a href='index.html'>Login</a>
        </button>
        <hr/>
        <div class='login'>Or login with</div>
        <div class='links'>
          <div class='facebook'>
            <i class='fa fa-facebook-f'>
              <span>Facebook</span>
            </i>
          </div>
          <div class='instagram'>
            <i class='fa fa-instagram'>
              <span>Instagram</span>
            </i>
          </div>
        </div>
        <div class='signup'>
          Don't have an account? &#8203; 
          <a href='#'>Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginInput;
