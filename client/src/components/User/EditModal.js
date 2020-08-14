import React from 'react';

import { motion } from 'framer-motion';

import '../../styles/modal.css';
import PostInput from './Post/PostInput';
import EditBioInput from './EditBioInput';

const EditModal = ({ handleEdit, info, isBio }) => {
  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      handleEdit(null);
    }
  };

  console.log({ info, isBio });

  return (
    <motion.div
      className='backdrop'
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className='LIKESMODAL_CONTENT EDIT'
        initial={{ y: '-100vh' }}
        animate={{ y: 0 }}
      >
        {isBio && <EditBioInput bio={info} closeModal={handleEdit} />}

        {!isBio && (
          <PostInput
            id={info.id}
            modal={true}
            username={info.username}
            fullname={info.fullname}
            picture={info.picture}
            placeholder={info.text}
            handleEdit={handleEdit}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default EditModal;
