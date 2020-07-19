import React, { useEffect, useState } from 'react';

import '../styles/user.css';
import Header from '../components/Header';
import NotFound from './NotFound';
import UserInfo from '../components/User/UserInfo';
import useFetch from '../hooks/useFetch';

const User = ({ match, authorized }) => {
  const { username } = match.params;
  const [userPage, setUserPage] = useState(null);

  const { error, loading, request } = useFetch();

  useEffect(async () => {
    const json = await request(`/api/user/${username}`);
    setUserPage(json.info);
  }, [request]);

  console.log({userPage})

  if (userPage === undefined) return <NotFound />

  if (loading) return <div></div>;

  return (
    <div>
      <div>
        <Header />
      </div>
      <UserInfo info={userPage}/>
    </div>
  );
};

export default User;
