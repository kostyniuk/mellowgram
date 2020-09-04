import React, { useState } from 'react';

import { motion } from 'framer-motion';

import '../../../styles/modal.css';
import LoginInput from '../../Auth/LoginInput';
import { useHistory } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';

const LoginModal = ({ closeHandler }) => {
  const history = useHistory();

  const [form, setForm] = useState({ username: '', password: '' });

  const { loading, error, request } = useFetch();

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
      history.push(`/${form.username}`);
      return window.location.reload(true);
    }
  };

  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      closeHandler(null);
    }
  };

  return (
    <motion.div
      className='backdrop'
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <LoginInput
        err={error}
        form={form}
        changeHandler={updateStateHandler}
        submitHandler={submitHandler}
        modal={true}
      />
    </motion.div>
  );
};

export default LoginModal;
