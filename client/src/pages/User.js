import React, { useEffect, useState, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../redux/actions';

import useFetch from '../hooks/useFetch';

import Header from '../components/Header/Header';
import NotFound from './NotFound';
import UserInfo from '../components/User/UserInfo';
import Posts from '../components/User/Post/Posts';

import '../styles/user.css';
const User = ({ match }) => {
  const dispatch = useDispatch();

  const { username } = match.params;
  const [userPage, setUserPage] = useState(null);

  const { loading, request, error } = useFetch();

  const parseInfo = useCallback(async () => {
    const json = await request(`/api/user/${username}`);
    if (json.success) {
      const {
        based_in,
        email,
        fullname,
        number_of_posts,
        occupation,
        phone_number,
        picture,
      } = json.info;
      const id = json.info.person_id;
      dispatch(
        setCurrentPage({
          id,
          username,
          based_in,
          email,
          fullname,
          number_of_posts,
          occupation,
          phone_number,
          picture,
        })
      );
    } else {
      setUserPage(undefined);
    }
  }, [username, request, dispatch]);

  useEffect(() => {
    parseInfo();
  }, [username, parseInfo]);

  if (userPage === undefined) return <NotFound />;

  if (loading) return <div></div>;

  return (
    <div>
      <div>
        <Header />
      </div>
      <UserInfo />
      <Posts />
    </div>
  );
};

export default User;
