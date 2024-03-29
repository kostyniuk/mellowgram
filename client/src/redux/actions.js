import {
  AUTH_USER,
  NOT_AUTH_USER,
  SET_CURRENT_PAGE,
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
  GET_CHATS,
  GET_MESSAGES,
  SET_UUID,
  ADD_MESSAGE,
  RESET_UNREAD_COUNTER,
  SET_ONLINE,
  ADD_CHAT,
  UPDATE_BIO,
  ADD_INTERESTS,
  SET_HOME_POSTS,
  LOAD_MORE_HOME_POSTS,
  ON_LIKE_POST_HOME,
  SET_SEARCH_RESULTS,
  EDIT_AUTH,
  EDIT_CURRENT,
  LOAD_NEW_PICTURE,
  REMOVE_PICTURE,
} from './types';

export const authUser = ({ information }) => ({
  type: AUTH_USER,
  payload: {
    information,
  },
});

export const notAuthUser = () => ({
  type: NOT_AUTH_USER,
});

export const setCurrentPage = ({
  id,
  bio,
  age,
  languages,
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
    bio,
    username,
    based_in,
    email,
    age,
    languages,
    fullname,
    number_of_posts,
    occupation,
    phone_number,
    picture,
  },
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

export const getChats = ({ chats, messages, me }) => ({
  type: GET_CHATS,
  payload: { chats, messages, me },
});

export const getMessages = ({ messages, chats }) => ({
  type: GET_MESSAGES,
  payload: { messages, chats },
});

export const setUuid = ({ uuid }) => ({
  type: SET_UUID,
  payload: { uuid },
});

export const addMessage = ({ info, me }) => ({
  type: ADD_MESSAGE,
  payload: { info, me },
});

export const resetUnreadCounter = ({ chatId }) => ({
  type: RESET_UNREAD_COUNTER,
  payload: { chatId },
});

export const setOnline = ({ onlineIds }) => ({
  type: SET_ONLINE,
  payload: { onlineIds },
});

export const addChat = ({ chat }) => ({
  type: ADD_CHAT,
  payload: { chat },
});

export const updateBio = ({ newBio }) => ({
  type: UPDATE_BIO,
  payload: { newBio },
});

export const addInterests = ({ interests }) => ({
  type: ADD_INTERESTS,
  payload: { interests },
});

export const setHomePosts = ({ posts, likes }) => ({
  type: SET_HOME_POSTS,
  payload: { posts, likes },
});

export const OnLikePostHome = ({ post, me }) => ({
  type: ON_LIKE_POST_HOME,
  payload: { post, me },
});

export const setSearchResults = ({ results }) => ({
  type: SET_SEARCH_RESULTS,
  payload: { results },
});

export const editAuth = ({ updatedFields }) => ({
  type: EDIT_AUTH,
  payload: { updatedFields },
});

export const editCurrent = ({ updatedFields }) => ({
  type: EDIT_CURRENT,
  payload: { updatedFields },
});

export const loadNewPicture = ({ pictureMeta }) => ({
  type: LOAD_NEW_PICTURE,
  payload: { pictureMeta },
});

export const removePicture = ({ picture }) => ({
  type: REMOVE_PICTURE,
  payload: { picture },
});
