import { SET_LIKES, LOAD_MORE_LIKES, ON_LIKE } from './types';

const initialState = {};

const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIKES:
      const { likes } = action.payload;

      let final = {};

      if (likes.length === 0) {
        return {};
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
        console.log({ obj, user_id });
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

    default: {
      return state;
    }
  }
};

export default likeReducer;
