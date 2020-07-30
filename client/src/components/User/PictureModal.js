import React from 'react';

import { motion } from 'framer-motion';

import '../../styles/picturesBar.css';

const PictureModal = ({ setSelectedImg, selectedImg }) => {
  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setSelectedImg(null);
    }
  };

  return (
    <motion.div
      className='backdrop'
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.img
        src={selectedImg}
        alt='enlarged pic'
        initial={{ y: '-100vh' }}
        animate={{ y: 0 }}
      />
      <div className='modal_actions'>
        <label>
          <div className='update_picture'>
            <input type='file'></input>
            <i
              class='fa fa-refresh delete_picture_button'
              aria-hidden='true'
            ></i>
            <p>&#8203; Load new picture</p>
          </div>
        </label>
        <div className='remove_picture'>
          <i class='fa fa-trash delete_picture_button' aria-hidden='true'></i>
          <p>&#8203; Remove picture</p>
        </div>
      </div>
    </motion.div>
  );
};

export default PictureModal;
