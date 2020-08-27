import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import equal from 'deep-equal';
import useFetch from './../../hooks/useFetch';
import { deleteFollow, addFollow } from '../../redux/actions';
import '../../styles/modal.css';

const FollowRow = ({ id, username, picture, alreadyFollowed }) => {
  const { request } = useFetch();
  const history = useHistory();

  const [following, setFollowing] = useState(alreadyFollowed);

  const loggedInUser = useSelector(
    (state) => state.loggedInUser,
    (prev, curr) => equal(prev, curr)
  );

  const info = useSelector(
    (state) => state.currentPage,
    (prev, curr) => {
      return equal(prev, curr);
    }
  );

  const dispatch = useDispatch();

  //need to fix here

  const followHandler = async () => {
    console.log({ following, id });
    if (following) {
      const responce = await request(`/api/follow/${id}`, { method: 'DELETE' });
      if (responce.success) {
        // dispatch(
        //   deleteFollow({
        //     producer: {
        //       id: loggedInUser.id,
        //       username: loggedInUser.username,
        //       picture: loggedInUser.picture,
        //     },
        //     consumer: { id, picture, username },
        //     myPage: loggedInUser.id === info.id,
        //   })
        // );
        setFollowing((prev) => !prev);
      }
    } else {
      const responce = await request(`/api/follow/${id}`, { method: 'POST' });

      console.log({ responce });

      if (responce.success) {
        // dispatch(
        //   addFollow({
        //     producer: {
        //       id: loggedInUser.id,
        //       username: loggedInUser.username,
        //       picture: loggedInUser.picture,
        //     },
        //     consumer: { id, picture, username },
        //     myPage: loggedInUser.id === info.id,
        //   })
        // );
        setFollowing((prev) => !prev);
      }
    }
  };

  let btnClassName = 'green';

  if (following) btnClassName += ' LIKESMODAL_BTN_followed';

  return (
    <div className='LIKESMODAL_ROW'>
      <div className='LIKESMODAL__title'>
        {/* <NavLink to={`/${username}`}> */}
        <div
          className='LIKESMODAL__title__left'
          onClick={() => {
            history.push(`/${username}`);
          }}
        >
          <img
            src={picture}
            alt='avatar'
            className='LIKESMODAL__profile_picture'
            style={{ marginTop: '0px' }}
          />
          <div className='LIKESMODAL__header'>
            <h3 className='LIKESMODAL__fullname'>{username}</h3>
          </div>
        </div>
        {id !== loggedInUser.id && (
          <div className='LIKESMODAL__title__right'>
            <button className={btnClassName} onClick={followHandler}>
              {following ? 'Following' : 'Follow'}
            </button>
          </div>
        )}
        {/* </NavLink> */}
      </div>
    </div>
  );
};

export default FollowRow;
