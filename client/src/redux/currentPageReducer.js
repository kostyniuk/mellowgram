import { UPDATE_BIO } from './types';

const initialState = {
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
  ready: false,
};

const currentPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
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
        ready: true,
      };

    case UPDATE_BIO: {
      return { ...state, bio: action.payload.newBio };
    }

    default: {
      return { ...state, ready: true };
    }
  }
};

export default currentPageReducer;
