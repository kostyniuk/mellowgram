import React from 'react';

import '../styles/user.css';
import Header from '../components/Header';
import UserInfo from '../components/User/UserInfo';

const User = ({ authorized }) => {
  // const { username } = match.params;
  console.log({authorized})
  return (
    <div>
      <div>
        <Header />
      </div>
      <UserInfo />
    </div>
  );
};

export default User;
