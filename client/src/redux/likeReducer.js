import { SET_LIKES, LOAD_MORE_LIKES } from './types';

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

    default: {
      return state;
    }
  }
};

export default likeReducer;
