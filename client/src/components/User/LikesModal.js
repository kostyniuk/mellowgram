import React from 'react';

import FollowRow from './FollowRow';

import { motion } from 'framer-motion';

import '../../styles/modal.css';

const PictureModal = ({ setSelectedImg, likes }) => {
  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setSelectedImg(null);
    }
  };

  console.log({ likes });

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
        {likes.data &&
          likes.data.map((user) => (
            <FollowRow
              key={user.person_id}
              picture={user.picture}
              username={user.username}
            />
          ))}
      </motion.div>
    </motion.div>
  );
};

export default PictureModal;
