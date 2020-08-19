import { SET_HOME_POSTS, ON_LIKE_POST_HOME } from './types';

const initialState = {};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HOME_POSTS:
      const { posts, likes } = action.payload;
      let final = {};

      posts.forEach((post) => {
        const likesForThePost = likes.filter(
          (thePost) => thePost.id === post.post_id
        )[0];

        final[post.post_id] = { ...post, likes: likesForThePost };
      });

      return { ...state, ...final };

    case ON_LIKE_POST_HOME: {
      const { post, me } = action.payload;

      const thePost = state[post];

      const alreadyLiked = thePost.likes.alreadyLiked;

      let updatedPost;

      if (alreadyLiked) {
        updatedPost = { ...thePost };
        updatedPost.number_of_likes--;
        updatedPost.likes.data = updatedPost.likes.data.filter(
          (person) => person.person_id !== me.id
        );
      } else {
        updatedPost = { ...thePost };
        updatedPost.number_of_likes++;
        updatedPost.likes.data.push({
          person_id: me.id,
          picture: me.picture,
          username: me.username,
        });
      }

      updatedPost.likes.alreadyLiked = !updatedPost.likes.alreadyLiked;

      return { ...state, [post]: updatedPost };
    }

    default: {
      return state;
    }
  }
};

export default postReducer;
