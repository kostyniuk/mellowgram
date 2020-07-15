import { useEffect, useCallback, useReducer, useState } from 'react';
import useFetch from './useFetch';

import infoReducer from '../reducers/infoReducer';
import { useScrollTrigger } from '@material-ui/core';

const useAuth = () => {
  const [info, dispatch] = useReducer(infoReducer, {
    isAuthenticated: false,
    id: null,
    username: '',
    ready: false
  });

  const [loading, setLoading] = useState(true)

  const { error, request } = useFetch();

  const fetchUser = useCallback(async () => {
    try {
      const responce = await request('/api/whoami');
      console.log({ responce });

      if (responce.success) {
        dispatch({
          type: 'fillOut',
          props: { id: responce.data.id, username: responce.data.username },
        });
      } else {
        dispatch({
          type: 'unsuccessful',
          props: { id: info.id, username: info.username },

        });
      }
      setLoading(false)
    } catch (e) {
      console.log(e);
    }
  }, [request]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { info, loading };
};

export default useAuth;
