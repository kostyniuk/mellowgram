import {
  SET_LIKES,
  LOAD_MORE_LIKES,
  ON_LIKE,
  CREATE_LIKES_ON_ADD_POST,
} from './types';

const initialState = {};

const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIKES:
      const { likes } = action.payload;

      let final = {};

      if (likes.length === 0) {
        return { loaded: true };
      }

      likes.forEach((post) => {
        final[post.id] = post;
      });

      return final;

    case LOAD_MORE_LIKES: {
      const { likes } = action.payload;
      let final = {};

      likes.forEach((post) => {
        final[post.id] = post;
      });

      return { ...state, ...final };
    }

    case ON_LIKE: {
      const { user_id, id } = action.payload;

      const likedUsers = state[id].data;

      const final = likedUsers.filter((obj) => {
        return obj.person_id !== action.payload.user_id;
      });

      if (likedUsers.length === final.length) {
        final.push({
          person_id: +user_id,
          picture: action.payload.picture,
          username: action.payload.username,
        });
        return { ...state, [id]: { id, data: final, alreadyLiked: true } };
      } else {
        return { ...state, [id]: { id, data: final, alreadyLiked: false } };
      }
    }

    case CREATE_LIKES_ON_ADD_POST: {
      const { id } = action.payload;

      const newLike = {
        id,
        data: [],
        alreadyLiked: false,
      };

      return { ...state, [id]: newLike };
    }

    default: {
      return state;
    }
  }
};

export default likeReducer;
