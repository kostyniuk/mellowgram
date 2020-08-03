import { SET_FOLLOWED_BY } from './types';

const initialState = {
  user: null,
};

const followedByReducer = (state = initialState, action) => {
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

export default followedByReducer;