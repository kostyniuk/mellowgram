import { SET_FOLLOWED_BY, ADD_FOLLOW, DELETE_FOLLOW } from './types';

const initialState = {
  user: null,
};

const followedByReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FOLLOWED_BY: {

      const { users, user } = action.payload;

      return { ...state, users, user };
    }


    case ADD_FOLLOW: {
      const { id, picture, username } = action.payload.producer;

      let { users } = state;
      users.push({ person_id: id, picture, username });

      return { ...state, users };
    }

    case DELETE_FOLLOW: {
      const { id } = action.payload.producer;
      let { users } = state;

      users = users.filter((user) => user.person_id !== id);

      return { ...state, users };
    }

    default: {
      return state;
    }
  }
};

export default followedByReducer;
