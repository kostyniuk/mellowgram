import React from 'react';
import '../../../styles/posts.css';

const Posts = () => {
  return (
    <div>
      <div className='POSTS__container'>
        <div className='POST__body'>
          <div className='POST__title'>
            <img
              src='http://localhost:3000/api/public/uploads/N6NCsEnf_6U9RvrfYNXpb.jpg'
              alt='avatar'
              className='POST__profile_picture'
            />
            <div className='POST__header'>
              <h3 className='POST__fullname'>Stephen Curry</h3>
              <h4 className='POST__username'>@steph</h4>
            </div>
          </div>
          <div className='POST__context'>
            <p>
              Wardell Stephen "Steph" Curry II 14, 1988[1]) is an American
              professional basketball player for the Golden State Warriors of
              the National Basketball Association (NBA). A six-time NBA
              All-Star, Curry has been named the NBA Most Valuable Player (MVP)
              twice and won three NBA championships with the Warriors. Many
              players and analysts have called him the greatest shooter in NBA
              history.[2] He is credited with revolutionizing the game of
              basketball by inspiring teams to regularly utilize the three-point
              shot.[3][4][5]
            </p>
            <div className='POST__actions'>
              <div className='POST__like_section'>
                <div className='POST__like_button'>
                  <i class='fa fa-heart' aria-hidden='true'></i>
                  <h4>&#8203; Like</h4>
                </div>
                  <h4 className='POST_number_of_likes'>23 Likes </h4>

                <div className='POST__liked_by'>
                  <h4>Liked by: </h4>
                  <img
                    src='http://localhost:3000/api/public/uploads/N6NCsEnf_6U9RvrfYNXpb.jpg'
                    alt='avatar'
                  />
                  <img
                    src='http://localhost:3000/api/public/uploads/N6NCsEnf_6U9RvrfYNXpb.jpg'
                    alt='avatar'
                  />
                  <img
                    src='http://localhost:3000/api/public/uploads/N6NCsEnf_6U9RvrfYNXpb.jpg'
                    alt='avatar'
                  />
                </div>
              </div>
              <h4 className='POST__creation_time'>23h ago</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
