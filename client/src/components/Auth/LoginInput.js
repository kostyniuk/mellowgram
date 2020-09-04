import React from 'react';

import '../../styles/loginInput.css';
import '../../styles/input.css';
import '../../styles/btn.css';

const LoginInput = ({ form, changeHandler, submitHandler, err, modal }) => {
  return (
    <div className='containerInput'>
      {!modal && (
        <div className='image'>
          <h1>
            Welcome To <span className='welcome'>Mellowgram</span>
          </h1>
        </div>
      )}
      <div className='content'>
        <h1>Login</h1>
        <div className='form-group'>
          <label>Username</label>
          <br />
          <input
            type='text'
            className='form-control'
            name='username'
            id='txt'
            aria-describedby='helpId'
            value={form.username}
            onChange={changeHandler}
          />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <br />
          <input
            type='password'
            className='form-control'
            name='password'
            id='txt'
            value={form.password}
            onChange={changeHandler}
          />
        </div>
        <a className='fp' href='/accounts/password/reset'>
          Forgot Password?
        </a>
        <br />
        <button type='button' className='btn green' onClick={submitHandler}>
          Login
        </button>
        {err && <h4 className='fp login-error'>{err}</h4>}
        <hr />
        <div className='login'>Or login with</div>
        <div className='links'>
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
        <div className='signup'>
          Don't have an account? &#8203;
          <a href='/signup'>Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginInput;
