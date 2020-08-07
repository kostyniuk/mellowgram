import { SET_FOLLOWED_BY, ADD_FOLLOW, DELETE_FOLLOW } from './types';

const initialState = {
  user: null,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FOLLOWED_BY: {
      const { users, user } = action.payload;

      return { ...state, users, user };
    }

    default: {
      return state;
    }
  }
};

export default chatReducer;
