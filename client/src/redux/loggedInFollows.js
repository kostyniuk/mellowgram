import { SET_LOGGED_IN_FOLLOWING, ADD_FOLLOW, DELETE_FOLLOW } from './types';

const initialState = {
  user: null,
};

const loggedInFollows = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN_FOLLOWING: {
      const { users, user } = action.payload;

      // return state;
      return { ...state, users, user };
    }

    case ADD_FOLLOW: {
      const { id, picture, username } = action.payload;

      let { users } = state;
      users.push({ person_id: id, picture, username });

      return { ...state, users };
    }

    case DELETE_FOLLOW: {
      const { id } = action.payload;
      let { users } = state;

      users = users.filter((user) => user.person_id !== id);

      return { ...state, users };
    }
    default: {
      return { ...state, ready: true };
    }
  }
};

export default loggedInFollows;
