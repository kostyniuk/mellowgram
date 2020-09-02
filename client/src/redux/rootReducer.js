import { combineReducers } from 'redux';

import loggedInUserReducer from './userReducer';
import currentPageReducer from './currentPageReducer';
import postReducer from './postReducer';
import likeReducer from './likeReducer';
import followingReducer from './followingReducer';
import followedByReducer from './followedByReducer';
import loggedInFollows from './loggedInFollows';
import chatsReducer from './chatReducer';
import messagesReducer from './messagesReducer';
import onlineUsersReducer from './onlineUsers';
import homePostsReducer from './homePostsReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
  loggedInUser: loggedInUserReducer,
  loggedInFollows: loggedInFollows,
  currentPage: currentPageReducer,
  posts: postReducer,
  likes: likeReducer,
  following: followingReducer,
  followedBy: followedByReducer,
  chats: chatsReducer,
  messages: messagesReducer,
  onlineUsers: onlineUsersReducer,
  homePosts: homePostsReducer,
  search: searchReducer,
});

export default rootReducer;
