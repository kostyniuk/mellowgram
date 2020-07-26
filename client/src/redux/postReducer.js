import { SET_POSTS, ADD_POST } from './types';

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

      posts.map((post) => {
        final[post.post_id] = post;
      });

      return { ...final, user };

    case ADD_POST: {
      const { post } = action.payload;

      return { ...state, post, user: state.user };
    }

    default: {
      return state;
    }
  }
};

export default postReducer;
