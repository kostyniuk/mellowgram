import React from 'react';
import '../styles/loginInput.css';

const SignupInput = ({ err, form, changeHandler, submitHandler }) => {
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
        <span>OR</span>
        <div className='form-group form-group-signup'>
          <label>Email</label>
          <br />
          <input
            type='text'
            className='form-control'
            name='email'
            id='txt'
            aria-describedby='helpId'
            value={form.email}
            onChange={changeHandler}
          />
        </div>
        <div className='form-group'>
          <label>Full Name</label>
          <br />
          <input
            type='text'
            className='form-control'
            name='fullName'
            id='txt'
            value={form.fullName}
            onChange={changeHandler}
          />
        </div>
        <div className='form-group'>
          <label>Username</label>
          <br />
          <input
            type='text'
            className='form-control'
            name='username'
            id='txt'
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

        <button type='button' className='btn' onClick={submitHandler}>
          <a>Sign up</a>
        </button>
        {err && <h4 className='fp login-error'>{err}</h4>}
        <div className='signup signup-signup'>
          Have an account? &#8203;
          <a href='/login'>Log in</a>
        </div>
      </div>
    </div>
  );
};

export default SignupInput;
