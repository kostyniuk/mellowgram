import { combineReducers } from 'redux';

import loggedInUserReducer from './userReducer';
import currentPageReducer from './currentPageReducer';
import postReducer from './postReducer';
import likeReducer from './likeReducer';
import followingReducer from './followingReducer';
import followedByReducer from './followedByReducer';

const rootReducer = combineReducers({
  loggedInUser: loggedInUserReducer,
  currentPage: currentPageReducer,
  posts: postReducer,
  likes: likeReducer,
  following: followingReducer,
  followedBy: followedByReducer,
});

export default rootReducer;
