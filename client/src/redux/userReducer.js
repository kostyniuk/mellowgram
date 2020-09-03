import { AUTH_USER, SET_UUID, EDIT_AUTH } from './types';

const initialState = {
  isAuthenticated: false,
  id: null,
  bio: null,
  username: null,
  based_in: null,
  email: null,
  fullname: null,
  number_of_posts: null,
  occupation: null,
  based_in: null,
  phone_number: null,
  picture: null,
  interests: null,
  ready: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      const { information } = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        ...information,
        ready: true,
      };

    case EDIT_AUTH: {
      const { updatedFields } = action.payload;

      return { ...state, ...updatedFields };
    }

    case SET_UUID: {
      return { ...state, uuid: action.payload.uuid };
    }

    default: {
      return { ...state, ready: true };
    }
  }
};

export default userReducer;
