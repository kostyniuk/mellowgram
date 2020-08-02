import { SET_FOLLOWING } from './types';

const initialState = {
  user: null,
};

const followingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FOLLOWING: {
      const { users, user } = action.payload;

      console.log({ user });

      return { ...state, users, user };
    }
    default: {
      return state;
    }
  }
};

export default followingReducer;
