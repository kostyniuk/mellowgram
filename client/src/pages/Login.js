import React, { useState } from 'react';
import LoginInput from '../components/LoginInput';
import Header from '../components/Header';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(null);
  const [textColor, setTextColor] = useState('text-danger');

  const onSubmitForm = async (e) => {
    e.preventDefault();
    // try {
    //   const body = { username, password };
    //   const response = await fetch('http://localhost:3000/api/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(body),
    //     credentials: 'include',
    //   });

    //   const jsonData = await response.json();
    //   console.log({ jsonData });
    //   if (jsonData.e) {
    //     setErr(
    //       'Sorry, your password was incorrect. Please double-check your password.'
    //     );
    //   } else {
    //     setErr(false);
    //     setTextColor('text-success');
    //   }

    //   //window.location = '/';
    // } catch (err) {
    //   console.error(err.message);
    // }
  };

  return (
    <div>
      <Header />
      <div>
        <LoginInput />
      </div>
    </div>
  );
};

export default Login;
