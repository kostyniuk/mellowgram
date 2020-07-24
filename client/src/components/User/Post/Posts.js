import React from 'react';
import '../../../styles/posts.css';
import Post from './Post';
import PostInput from './PostInput';

import { useSelector } from 'react-redux';

const Posts = () => {
  const currentUser = useSelector((state) => state.currentPage);
  const loggedInUser = useSelector((state) => state.loggedInUser);

  console.log({ currentUser, loggedInUser });

  return (
    <div className='POSTS__container'>
      {currentUser.id === loggedInUser.id && (
        <PostInput
          picture='http://localhost:3000/api/public/uploads/N6NCsEnf_6U9RvrfYNXpb.jpg'
          fullname='Steph Curry'
          username='steph'
        />
      )}
      <Post
        picture='http://localhost:3000/api/public/uploads/N6NCsEnf_6U9RvrfYNXpb.jpg'
        fullname='Steph Curry'
        username='steph'
        text='The son of former NBA player Dell Curry and older brother of current NBA player Seth, Curry played college basketball for the Davidson Wildcats. There, he was twice named Southern Conference Player of the Year and set the all-time scoring record for both Davidson and the Southern Conference. During his sophomore year, Curry also set the single-season NCAA record for three-pointers made, and was then selected by the Warriors with the seventh overall pick in the 2009 NBA Draft.'
        numberOfLikes='999'
        postedAt='23h'
      />
      <Post
        picture='http://localhost:3000/api/public/uploads/N6NCsEnf_6U9RvrfYNXpb.jpg'
        fullname='Steph Curry'
        username='steph'
        text='2009 NBA Draft.'
        numberOfLikes='999'
        postedAt='23h'
      />
    </div>
  );
};

export default Posts;
