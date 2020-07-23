import React, { useEffect, useState, useCallback } from 'react';

import '../styles/user.css';
import Header from '../components/Header/Header';
import NotFound from './NotFound';
import UserInfo from '../components/User/UserInfo';
import useFetch from '../hooks/useFetch';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../redux/actions';

const User = ({ match, authorized }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentPage);

  const { username } = match.params;
  const [userPage, setUserPage] = useState(null);

  const { loading, request, error } = useFetch();

  const parseInfo = useCallback(async () => {
    const json = await request(`/api/user/${username}`);
    if (!json.error) {
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
      <UserInfo info={currentUser} />
    </div>
  );
};

export default User;
