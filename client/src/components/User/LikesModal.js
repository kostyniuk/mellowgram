import React from 'react';

import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import FollowRow from './FollowRow';

import '../../styles/modal.css';

const LikesModal = ({ closeHandler, info }) => {
  const following = useSelector((state) => state.loggedInFollows);

  console.log({ info });

  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      closeHandler(null);
    }
  };

  const isAlreadyFollowed = (id) => {
    const { users } = following;
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
        {info.data &&
          info.data.map((user) => (
            <FollowRow
              key={user.person_id}
              id={user.person_id}
              picture={user.picture}
              username={user.username}
              alreadyFollowed={isAlreadyFollowed(user.person_id)}
            />
          ))}
      </motion.div>
    </motion.div>
  );
};

export default LikesModal;
