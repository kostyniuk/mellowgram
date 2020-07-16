import React from 'react';

import '../styles/user.css';
import Header from '../components/Header';
import UserInfo from '../components/UserInfo';

const User = ({ match }) => {
  const { username } = match.params;

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
