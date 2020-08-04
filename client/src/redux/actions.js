import {
  AUTH_USER,
  NOT_AUTH_USER,
  SET_CURRENT_PAGE,
  UPDATE_PROFILE_PICTURE,
  UPDATE_PROFILE_INFO,
  SET_POSTS,
  ADD_POST,
  LOAD_MORE_POSTS,
  SET_LIKES,
  LOAD_MORE_LIKES,
  ON_LIKE,
  UPDATE_NUMBER_OF_LIKES,
  INCREMENT_NUMBER_OF_LIKES,
  DECREMENT_NUMBER_OF_LIKES,
  CREATE_LIKES_ON_ADD_POST,
  DELETE_POST,
  EDIT_POST,
  SET_FOLLOWING,
  SET_FOLLOWED_BY,
  SET_LOGGED_IN_FOLLOWING,
  ADD_FOLLOW,
  DELETE_FOLLOW,
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

export const addPost = ({ post }) => ({
  type: ADD_POST,
  payload: { post },
});

export const loadMorePosts = ({ posts }) => ({
  type: LOAD_MORE_POSTS,
  payload: { posts },
});

export const setLikes = ({ likes }) => ({
  type: SET_LIKES,
  payload: { likes },
});

export const loadMoreLikes = ({ likes }) => ({
  type: LOAD_MORE_LIKES,
  payload: { likes },
});

export const onLike = (info) => ({
  type: ON_LIKE,
  payload: info,
});

export const incrementNumberOfLikes = (id) => ({
  type: INCREMENT_NUMBER_OF_LIKES,
  payload: { id },
});

export const decrementNumberOfLikes = (id) => ({
  type: DECREMENT_NUMBER_OF_LIKES,
  payload: { id },
});

export const createLikesOnAddPost = (id) => ({
  type: CREATE_LIKES_ON_ADD_POST,
  payload: { id },
});

export const deletePost = (id) => ({
  type: DELETE_POST,
  payload: { id },
});

export const editPost = (id, newCaption) => ({
  type: EDIT_POST,
  payload: { id, newCaption },
});

export const setFollowing = ({ users, user }) => ({
  type: SET_FOLLOWING,
  payload: { users, user },
});

export const setFollowedBy = ({ users, user }) => ({
  type: SET_FOLLOWED_BY,
  payload: { users, user },
});

export const setLoggedInFollowing = ({ users, user }) => ({
  type: SET_LOGGED_IN_FOLLOWING,
  payload: { users, user },
});

export const addFollow = ({ producer, consumer, myPage }) => ({
  type: ADD_FOLLOW,
  payload: { producer, consumer, myPage },
});

export const deleteFollow = ({ producer, consumer, myPage }) => ({
  type: DELETE_FOLLOW,
  payload: { producer, consumer, myPage },
});
