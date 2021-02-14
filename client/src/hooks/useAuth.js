import { useEffect, useCallback, useState } from 'react';
import useFetch from './useFetch';

import { useDispatch } from 'react-redux';
import { authUser, notAuthUser } from '../redux/actions';

const useAuth = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const { error, request } = useFetch();

  const fetchUser = useCallback(async () => {
    try {
      const responce = await request('/api/whoami');

      if (responce.success) {
        const json = await request(`/api/user/${responce.data.username}`);
        const { id, username } = responce.data;

        const resInterests = await request(`/api/interest/${username}`);

        const resPictures = await request(
          `/api/pictures/${responce.data.username}`
        );

        const resLanguages = await request(`/api/language/${id}`);

        console.log({resLanguages})

        const {languages} = resLanguages
        const { interests } = resInterests;
        const { pictures } = resPictures;

        dispatch(
          authUser({
            information: { ...json.info, username, id, interests, languages, pictures },
          })
        );
      } else {
        dispatch(notAuthUser());
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [request, dispatch]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { loading };
};

export default useAuth;
