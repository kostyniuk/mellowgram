import {
  AUTH_USER,
  NOT_AUTH_USER,
  SET_CURRENT_PAGE,
  UPDATE_PROFILE_PICTURE,
  UPDATE_PROFILE_INFO,
  SET_POSTS,
  RESET_POSTS,
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
  type: UPDATE_PROFILE_INFO,
  payload: { username, based_in, email, fullname, occupation, phone_number },
});

export const setPosts = ({ posts, user }) => ({
  type: SET_POSTS,
  payload: { posts, user },
});
