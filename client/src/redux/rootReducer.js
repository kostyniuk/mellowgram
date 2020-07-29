import { combineReducers } from 'redux';

import loggedInUserReducer from './userReducer';
import currentPageReducer from './currentPageReducer';
import postReducer from './postReducer';
import likeReducer from './likeReducer';

const rootReducer = combineReducers({
  loggedInUser: loggedInUserReducer,
  currentPage: currentPageReducer,
  posts: postReducer,
  likes: likeReducer,
});

export default rootReducer;
