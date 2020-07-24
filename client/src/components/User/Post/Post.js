import React from 'react';

function Post({
  picture,
  fullname,
  username,
  text,
  numberOfLikes,
  liked_by,
  postedAt,
}) {
  return (
    <div>
        <div className='POST__body'>
          <div className='POST__title'>
            <img
              src={picture}
              alt='avatar'
              className='POST__profile_picture'
            />
            <div className='POST__header'>
              <h3 className='POST__fullname'>{fullname}</h3>
  <h4 className='POST__username'>@{username}</h4>
            </div>
          </div>
          <div className='POST__context'>
            <p>
              {text}
            </p>
            <div className='POST__actions'>
              <div className='POST__like_section'>
                <div className='POST__like_button'>
                  <i class='fa fa-heart' aria-hidden='true'></i>
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
              <h4 className='POST__creation_time'>{postedAt} ago</h4>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Post;
