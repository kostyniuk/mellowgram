import { SET_POSTS } from './types';

const initialState = {};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      const { posts } = action.payload;

      let final = {};

      posts.map((post) => {
        final[post.post_id] = post;
      });

      return { ...state, ...final };

    default: {
      return state;
    }
  }
};

export default postReducer;
