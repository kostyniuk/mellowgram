import { SET_POSTS } from './types';

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

    default: {
      return state;
    }
  }
};

export default postReducer;
