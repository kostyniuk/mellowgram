import React, { useState } from 'react';

import useFetch from '../hooks/useFetch';

import LoginInput from '../components/LoginInput';
import Header from '../components/Header';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [err, setErr] = useState(null);

  const { loading, error, request } = useFetch();

  console.log({ loading, error });

  const updateStateHandler = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async () => {
    setForm({ username: '', password: '' });

    const responce = await request('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    console.log({ responce });
  };

  return (
    <div>
      <Header />
      <div>
        <LoginInput
          err={error}
          form={form}
          changeHandler={updateStateHandler}
          submitHandler={submitHandler}
        />
      </div>
    </div>
  );
};

export default Login;
