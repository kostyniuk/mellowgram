import {
  SET_POSTS,
  ADD_POST,
  LOAD_MORE_POSTS,
  INCREMENT_NUMBER_OF_LIKES,
  DECREMENT_NUMBER_OF_LIKES,
  DELETE_POST,
  EDIT_POST,
  SET_HOME_POSTS,
} from './types';

const initialState = {};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HOME_POSTS:
      const { posts, likes } = action.payload;
      let final = {};

      if (posts.length === 0) {
        return {};
      }

      posts.forEach((post) => {
        const likesForThePost = likes.filter(
          (thePost) => thePost.id === post.post_id
        )[0];

        final[post.post_id] = { ...post, likes: likesForThePost };
      });

      return { ...final };

    default: {
      return state;
    }
  }
};

export default postReducer;
