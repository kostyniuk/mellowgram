import React, { useState, useEffect, useCallback } from 'react';

import useFetch from '../../../hooks/useFetch';
import { motion } from 'framer-motion';

import '../../../styles/picturesBar.css';
import { useSelector, useDispatch } from 'react-redux';
import { editCurrent, loadNewPicture } from '../../../redux/actions';

const PicturesBar = ({ setSelectedImg }) => {
  const { request } = useFetch();
  const dispatch = useDispatch();

  const currentPage = useSelector((state) => state.currentPage);
  const loggedInUser = useSelector((state) => state.loggedInUser);

  const pictures =
    currentPage.id === loggedInUser.id
      ? loggedInUser.pictures
      : currentPage.pictures;

  const fetchPictures = useCallback(async () => {
    const response = await request(`/api/pictures/${currentPage.username}`);
    dispatch(editCurrent({ updatedFields: { pictures: response.pictures } }));
  }, [currentPage.id]);

  useEffect(() => {
    fetchPictures();
  }, [fetchPictures]);

  const selectImage = async (event) => {
    let file = event.target.files[0];
    const fd = new FormData();
    fd.append('picture', file);
    let url = `/api/pictures`;
    const response = await request(url, {
      method: 'POST',
      body: fd,
    });
    if (response.success) {
      const { data } = response;
      dispatch(loadNewPicture({ pictureMeta: data }));
    }
  };

  return (
    <div className='USER_INFO__picturesBar'>
      <div className='USER_INFO_picturesBar_header'>
        <h3 className='USER_INFO__picturesBar__title'>My pictures &#8203; </h3>
        <div className='USER_INFO__picturesBar__add'>
          {loggedInUser.id === currentPage.id && pictures.length < 9 && (
            <div className='UPLOAD_btn_upload ADD_PICTURE'>
              <input
                type='file'
                id='UPLOAD_PROFILE_PICTURE'
                name=''
                onChange={selectImage}
              />
              <i className='fa fa-plus' aria-hidden='true'></i>
            </div>
          )}
        </div>
      </div>
      <div className='USER_INFO_picturesBar_body'>
        <div className='img-grid'>
          {pictures &&
            pictures.map((picture) => (
              <motion.div
                className='img-wrap'
                key={picture.picture_id}
                layout
                onClick={() => setSelectedImg(picture)}
              >
                <motion.img
                  src={picture.path}
                  alt='uploaded pic'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                />
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PicturesBar;
