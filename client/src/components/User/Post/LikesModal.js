import React from 'react';

import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import FollowRow from '../FollowRow';

import '../../../styles/modal.css';
import MatchedRow from '../../Search/MatchedRow';

const LikesModal = ({ closeHandler, info, title = 'test', type = 'users' }) => {
  const following = useSelector((state) => state.loggedInFollows);

  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      closeHandler(null);
    }
  };

  const isAlreadyFollowed = (id) => {
    const { users } = following;

    if (!users) return false;

    const ids = users.map((userObj) => userObj.person_id);
    return ids.includes(id);
  };

  return (
    <motion.div
      className='backdrop'
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className='LIKESMODAL_CONTENT'
        initial={{ y: '-100vh' }}
        animate={{ y: 0 }}
      >
        <div className='LIKES_MODAL_TITLE'>
          <h3>{title}</h3>
          <hr className='hr'></hr>
        </div>
        {info.data &&
          type === 'users' &&
          info.data.map((user) => (
            <FollowRow
              key={user.person_id}
              id={user.person_id}
              picture={user.picture}
              username={user.username}
              alreadyFollowed={isAlreadyFollowed(user.person_id)}
            />
          ))}
        {info.data &&
          type === 'interests' &&
          info.data.map((interest, index) => (
            <MatchedRow
              key={interest.interest_id}
              id={interest.interest_id}
              name={interest.interest_name}
              color={interest.interest_color}
            />
          ))}
      </motion.div>
    </motion.div>
  );
};

export default LikesModal;
