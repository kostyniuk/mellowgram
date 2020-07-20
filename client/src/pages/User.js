import React, { useEffect, useState } from 'react';

import '../styles/user.css';
import Header from '../components/Header/Header';
import NotFound from './NotFound';
import UserInfo from '../components/User/UserInfo';
import useFetch from '../hooks/useFetch';


const User = ({ match, authorized }) => {
  const { username } = match.params;
  const [userPage, setUserPage] = useState(null);

  const { error, loading, request } = useFetch();

  const parseInfo = async () => {
    const json = await request(`/api/user/${username}`);
    setUserPage(json.info);
  };

  useEffect(() => {
    parseInfo();
  }, [username]);

  console.log({ userPage, authorized, username });

  if (userPage === undefined) return <NotFound />;

  if (loading) return <div></div>;

  return (
    <div>
      <div>
        <Header authorized={authorized}/>
      </div>
      <UserInfo info={userPage} />
    </div>
  );
};

export default User;
