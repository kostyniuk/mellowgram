import {
  AUTH_USER,
  UPDATE_PROFILE_PICTURE,
  UPDATE_PROFILE_INFO,
  SET_UUID,
} from './types';

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
  phone_number: null,
  picture: null,
  interests: null,
  ready: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        isAuthenticated: true,
        id: action.payload.id,
        bio: action.payload.bio,
        username: action.payload.username,
        based_in: action.payload.based_in,
        email: action.payload.email,
        fullname: action.payload.fullname,
        number_of_posts: action.payload.number_of_posts,
        occupation: action.payload.occupation,
        phone_number: action.payload.phone_number,
        picture: action.payload.picture,
        interests: action.payload.interests,
        ready: true,
      };
    case UPDATE_PROFILE_PICTURE: {
      return {
        ...state,
        picture: action.payload.picture,
        ready: true,
      };
    }
    case UPDATE_PROFILE_INFO: {
      return {
        ...state,
        username: action.payload.username,
        based_in: action.payload.based_in,
        email: action.payload.email,
        fullname: action.payload.fullname,
        occupation: action.payload.occupation,
        phone_number: action.payload.phone_number,
        ready: true,
      };
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
