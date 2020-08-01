import {
  SET_POSTS,
  ADD_POST,
  LOAD_MORE_POSTS,
  UPDATE_NUMBER_OF_LIKES,
  INCREMENT_NUMBER_OF_LIKES,
  DECREMENT_NUMBER_OF_LIKES,
} from './types';

const initialState = {
  user: null,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      const { posts, user } = action.payload;
      let final = {};

      if (posts.length === 0) {
        return { user };
      }

      posts.forEach((post) => {
        final[post.post_id] = post;
      });

      return { ...final, user };

    case ADD_POST: {
      const { post } = action.payload;

      const final = {};

      final[post.post_id] = post;

      return { ...state, ...final, user: state.user };
    }

    case LOAD_MORE_POSTS: {
      const { posts } = action.payload;
      let final = {};
      posts.forEach((post) => {
        final[post.post_id] = post;
      });

      return { ...state, ...final, user: state.user };
    }

    case INCREMENT_NUMBER_OF_LIKES: {
      console.log({ state, payload: action.payload });

      const { id } = action.payload;

      return state;
    }

    case DECREMENT_NUMBER_OF_LIKES: {
      console.log({ state, payload: action.payload });

      const { id } = action.payload;

      return state;
    }
    default: {
      return state;
    }
  }
};

export default postReducer;
