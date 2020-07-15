import { useEffect, useCallback, useReducer } from 'react';
import useFetch from './useFetch';

import infoReducer from '../reducers/infoReducer';

const useAuth = () => {
  const [info, dispatch] = useReducer(infoReducer, {
    isAuthenticated: false,
    id: null,
    username: '',
    ready: false
  });

  const { error, loading, request } = useFetch();
  console.log({ error, loading, info });

  const fetchUser = useCallback(async () => {
    try {
      const responce = await request('/api/isAuthenticated');
      console.log({ responce });

      if (responce.success) {
        dispatch({
          type: 'fillOut',
          props: { id: responce.data._id, username: responce.data.username },
        });
      } else {
        dispatch({
          type: 'unsuccessful',
          props: { id: info.id, username: info.username },

        });
      }
    } catch (e) {
      console.log(e);
    }
  }, [request]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { info };
};

export default useAuth;
