import React, { useState } from 'react';
import SignupInput from '../components/Auth/SignupInput';
import Header from '../components/Header/Header';
import { useHistory } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const Signup = () => {
  const history = useHistory();

  const [form, setForm] = useState({
    email: '',
    fullName: '',
    username: '',
    password: '',
  });

  const { loading, error, request } = useFetch();

  console.log({ form });
  console.log({ loading, error });

  const updateStateHandler = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async () => {
    setForm({ email: '', fullName: '', username: '', password: '' });

    const responce = await request('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    console.log({ responce });

    if (responce.success) {
      return history.push('/login');
    }

    return
  };

  return (
    <div>
      <Header authorized={{isAuthenticated: false}}/>

      <SignupInput
        err={error}
        form={form}
        changeHandler={updateStateHandler}
        submitHandler={submitHandler}
      />
    </div>
  );
};

export default Signup;
