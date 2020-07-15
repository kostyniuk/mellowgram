import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import useFetch from '../hooks/useFetch';

import LoginInput from '../components/LoginInput';
import Header from '../components/Header';

const Login = () => {
  const history = useHistory();

  const [form, setForm] = useState({ username: '', password: '' });

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

    if (responce.success) {
      return history.push(`/${responce.username}`);
    }

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
