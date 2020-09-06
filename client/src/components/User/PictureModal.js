import React from 'react';

import { motion } from 'framer-motion';

import '../../styles/picturesBar.css';
import useFetch from '../../hooks/useFetch';
import { useDispatch, useSelector } from 'react-redux';
import { removePicture } from '../../redux/actions';

const PictureModal = ({ setSelectedImg, selectedImg }) => {
  const { request } = useFetch();
  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => state.loggedInUser);

  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setSelectedImg(null);
    }
  };

  const removeHandler = async () => {
    const response = await request(`/api/pictures/${selectedImg.picture_id}`, {
      method: 'DELETE',
    });

    if (response.success) {
      dispatch(removePicture({ picture: selectedImg }));
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
        src={selectedImg.path}
        alt='enlarged pic'
        initial={{ y: '-100vh' }}
        animate={{ y: 0 }}
      />
      {loggedInUser.id === setSelectedImg.user_id && <div className='modal_actions'>
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
        <div className='remove_picture' onClick={removeHandler}>
          <i class='fa fa-trash delete_picture_button' aria-hidden='true'></i>
          <p>&#8203; Remove picture</p>
        </div>
      </div>}
    </motion.div>
  );
};

export default PictureModal;
