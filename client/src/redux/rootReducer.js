import { combineReducers } from 'redux';

import loggedInUserReducer from './userReducer';
import currentPageReducer from './currentPageReducer';
import postReducer from './postReducer';
import likeReducer from './likeReducer';
import followingReducer from './followingReducer';
import followedByReducer from './followedByReducer';
import loggedInFollows from './loggedInFollows';

const rootReducer = combineReducers({
  loggedInUser: loggedInUserReducer,
  loggedInFollows: loggedInFollows,
  currentPage: currentPageReducer,
  posts: postReducer,
  likes: likeReducer,
  following: followingReducer,
  followedBy: followedByReducer,
});

export default rootReducer;
