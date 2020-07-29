import React, { useState } from 'react';

function Post({
  picture,
  fullname,
  username,
  text,
  numberOfLikes,
  liked_by,
  postedAt,
  showSettings,
}) {
  const [liked, setLiked] = useState(false);
  let likeButtonClasses = liked ? 'fa fa-heart liked' : 'fa fa-heart';

  console.log({liked})

  const likeHandler = () => {
    setLiked((prev) => !prev);
  };

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
                  onClick={likeHandler}
                ></i>
                <h4>&#8203; Like</h4>
              </div>
              <h4 className='POST_number_of_likes'>{numberOfLikes} Likes </h4>

              <div className='POST__liked_by'>
                <h4>Liked by: </h4>
                <img
                  src='http://localhost:3000/api/public/uploads/user_dloading.jpg'
                  alt='avatar'
                />
                <img
                  src='http://localhost:3000/api/public/uploads/N6NCsEnf_6U9RvrfYNXpb.jpg'
                  alt='avatar'
                />
                <img
                  src='http://localhost:3000/api/public/uploads/user_kostyniuk.jpg'
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
}

export default Post;
