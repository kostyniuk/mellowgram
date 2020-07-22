import React, { useState } from 'react';

import '../styles/uploadButton.css';

import {useSelector, useDispatch} from 'react-redux'

import {updateProfilePage}  from '../redux/actions'

const UploadButton = () => {
  const [newImage, setNewImage] = useState(null);
  const [reset, setReset] = useState(false);
  const [removed, setRemoved] = useState(false);

  const {username, picture} = useSelector(state => state.loggedInUser)
  const dispatch = useDispatch()
  console.log({username, picture})

  const deleteImage = () => {
    setRemoved(() => true);
  };

  const resetUploaded = (e) => {
    e.preventDefault();
    setNewImage(null);
  };


  const setProfilePhoto = async (event) => {
    event.preventDefault();
    const fd = new FormData();
    fd.append('profilePhoto', newImage);
    const method = removed ? 'DELETE' : 'POST';
    let url = `http://localhost:3000/api/user/${username}/addPicture`;
    if (removed) {
      url = `http://localhost:3000/api/user/${username}/deletePicture`;
    }
    const response = await fetch(url, {
      method,
      body: fd,
    });
    const data = await response.json();
    console.log(data);
    dispatch(updateProfilePage(data.src))
    setNewImage(null);
  };

  const selectImage = (event) => {
    let file = event.target.files[0];
    setNewImage(file);
  };

  return (
    <div>
      <div class='UPLOAD_panel'>
        <div class='UPLOAD_button_outer'>
          {newImage ? (
            <div className='newPictureBtns'>
              <button className='green' onClick={setProfilePhoto}>
                Submit
              </button>
              <button className='green red' onClick={resetUploaded}>
                Reset
              </button>
            </div>
          ) : (
            <div class='UPLOAD_btn_upload'>
              <input
                type='file'
                id='UPLOAD_PROFILE_PICTURE'
                name=''
                onChange={selectImage}
              />
              Upload New Image
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadButton;
