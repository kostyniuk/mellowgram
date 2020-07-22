import {
  AUTH_USER,
  NOT_AUTH_USER,
  SET_CURRENT_PAGE,
  UPDATE_PROFILE_PICTURE,
} from './types';

export const authUser = ({
  id,
  username,
  based_in,
  email,
  fullname,
  number_of_posts,
  occupation,
  phone_number,
  picture,
}) => ({
  type: AUTH_USER,
  payload: {
    id,
    username,
    based_in,
    email,
    fullname,
    number_of_posts,
    occupation,
    phone_number,
    picture,
  },
});

export const notAuthUser = () => ({
  type: NOT_AUTH_USER,
});

export const setCurrentPage = ({
  id,
  username,
  based_in,
  email,
  fullname,
  number_of_posts,
  occupation,
  phone_number,
  picture,
}) => ({
  type: SET_CURRENT_PAGE,
  payload: {
    id,
    username,
    based_in,
    email,
    fullname,
    number_of_posts,
    occupation,
    phone_number,
    picture,
  },
});

export const updateProfilePicture = (picture) => ({
  type: UPDATE_PROFILE_PICTURE,
  payload: { picture },
});

export const updateProfileInfo = ({
  username,
  based_in,
  email,
  fullname,
  occupation,
  phone_number,
}) => ({
  type: UPDATE_PROFILE_PICTURE,
  payload: { username, based_in, email, fullname, occupation, phone_number },
});
