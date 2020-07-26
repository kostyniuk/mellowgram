import { combineReducers } from 'redux';

import loggedInUserReducer from './userReducer';
import currentPageReducer from './currentPageReducer';
import postReducer from './postReducer';

const rootReducer = combineReducers({
  loggedInUser: loggedInUserReducer,
  currentPage: currentPageReducer,
  posts: postReducer,
});

export default rootReducer;
