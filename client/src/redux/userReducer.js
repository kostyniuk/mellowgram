import {
  AUTH_USER,
  SET_UUID,
  EDIT_AUTH,
  LOAD_NEW_PICTURE,
  REMOVE_PICTURE,
} from './types';

const initialState = {
  isAuthenticated: false,
  id: null,
  bio: null,
  username: null,
  email: null,
  age: null,
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

    case LOAD_NEW_PICTURE: {
      const { pictureMeta } = action.payload;

      let { pictures } = state;
      pictures.unshift(...pictureMeta);

      return { ...state, pictures };
    }

    case REMOVE_PICTURE: {
      const { picture } = action.payload;

      let { pictures } = state;
      pictures = pictures.filter(
        (cur) => cur.picture_id !== picture.picture_id
      );

      return { ...state, pictures };
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
