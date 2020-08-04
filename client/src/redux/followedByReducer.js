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

    //need to provide parametr to distinguish where I am now, if my own page - following, else - followedBy

    case ADD_FOLLOW: {
      const { myPage } = action.payload;

      const { id, picture, username } = action.payload.producer;

      let { users } = state;
      users.push({ person_id: id, picture, username });

      console.log({myPage})

      return { ...state, users };
    }

    case DELETE_FOLLOW: {
      const { myPage } = action.payload;

      const { id } = action.payload.producer;
      let { users } = state;

      console.log({myPage})

      users = users.filter((user) => user.person_id !== id);

      return { ...state, users };
    }

    default: {
      return state;
    }
  }
};

export default followedByReducer;
