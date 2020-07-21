import {combineReducers} from 'redux';

import loggedInUserReducer from './userReducer';
import currentPageReducer from './currentPageReducer';

const rootReducer = combineReducers({
  loggedInUser: loggedInUserReducer,
  currentPage: currentPageReducer
})

export default rootReducer;