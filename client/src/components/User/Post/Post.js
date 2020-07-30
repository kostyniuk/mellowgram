import React, { useState } from 'react';

import useFetch from '../../../hooks/useFetch';

const Post = ({
  id,
  picture,
  fullname,
  username,
  text,
  numberOfLikes,
  likes,
  postedAt,
  showSettings,
}) => {
  const { request } = useFetch();

  //need to update state of posts - number of likes and likes - add new like
  // we have user_id need to select from state.loggedinUser and add username and picture to new action

  const [liked, setLiked] = useState(likes?.alreadyLiked || false);
  let likeButtonClasses = liked ? 'fa fa-heart liked' : 'fa fa-heart';

  const handleLike = async () => {
    const method = liked ? 'DELETE' : 'POST';

    const res = await request(`/api/like/${id}`, {
      method,
    });

    console.log({ res });
    if (res?.success) {
      setLiked((prev) => !prev);
    }
  };

  if (!likes) return <div></div>;

  return (
    <div>
      <div className='POST__body'>
        <div className='POST__title'>
          <div className='POST__title__left'>
            <img src={picture} alt='avatar' className='POST__profile_picture' />
            <div className='POST__header'>
              <h3 className='POST__fullname'>{fullname}</h3>
              <h4 className='POST__username'>@{username}</h4>
            </div>
          </div>
          {showSettings && (
            <div className='POST__title__right'>
              <i className='fa fa-cog' aria-hidden='true'></i>
            </div>
          )}
        </div>
        <div className='POST__context'>
          <p>{text}</p>
          <div className='POST__actions'>
            <div className='POST__like_section'>
              <div className='POST__like_button'>
                <i
                  className={likeButtonClasses}
                  aria-hidden='true'
                  onClick={handleLike}
                ></i>
                {liked ? <h4>&#8203; Liked</h4> : <h4>&#8203; Like &#8203;</h4>}
              </div>
              <h4 className='POST_number_of_likes'>{numberOfLikes} Likes </h4>

              <div className='POST__liked_by'>
                <h4>Liked by: </h4>
                <img
                  src={
                    likes.data.length
                      ? likes.data[0].picture
                      : '/api/public/uploads/blank.jpg'
                  }
                  alt='avatar'
                />
                <img
                  src={
                    likes.data.length > 1
                      ? likes.data[1].picture
                      : '/api/public/uploads/blank.jpg'
                  }
                  alt='avatar'
                />
                <img
                  src={
                    likes.data.length > 2
                      ? likes.data[2].picture
                      : '/api/public/uploads/blank.jpg'
                  }
                  alt='avatar'
                />
              </div>
            </div>
            <h4 className='POST__creation_time'>{postedAt}</h4>
          </div>
        </div>
      </div>
      {/* <hr className='hr' /> */}
    </div>
  );
};

export default Post;
