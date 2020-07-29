import React, { useState } from 'react';

const Post = ({
  picture,
  fullname,
  username,
  text,
  numberOfLikes,
  likes,
  postedAt,
  showSettings,
}) => {
  const [liked, setLiked] = useState(likes?.alreadyLiked || false);
  let likeButtonClasses = liked ? 'fa fa-heart liked' : 'fa fa-heart';

  if (!likes) return <div></div>;

  console.log({ likes });

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
                  onClick={() => setLiked((prev) => !prev)}
                ></i>
                <h4>&#8203; Like</h4>
              </div>
              <h4 className='POST_number_of_likes'>{numberOfLikes} Likes </h4>

              <div className='POST__liked_by'>
                <h4>Liked by: </h4>
                  <img src={ likes.data.length ? likes.data[0].picture : '/api/public/uploads/blank.jpg'} alt='avatar' />
                  <img src={ likes.data.length > 1 ? likes.data[1].picture : '/api/public/uploads/blank.jpg'} alt='avatar' />
                  <img src={ likes.data.length > 2 ? likes.data[2].picture : '/api/public/uploads/blank.jpg'} alt='avatar' />
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
