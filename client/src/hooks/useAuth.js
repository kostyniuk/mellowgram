import { useEffect, useCallback, useReducer, useState } from 'react';
import useFetch from './useFetch';

import infoReducer from '../reducers/infoReducer';
import { useScrollTrigger } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { authUser, notAuthUser } from '../redux/actions';

const useAuth = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);

  const [loading, setLoading] = useState(true);

  const { error, request } = useFetch();

  const fetchUser = useCallback(async () => {
    try {
      const responce = await request('/api/whoami');
      console.log({ responce });

      if (responce.success) {
        dispatch(
          authUser({ id: responce.data.id, username: responce.data.username })
        );
      } else {
        dispatch(notAuthUser());
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [request]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { loading };
};

export default useAuth;
