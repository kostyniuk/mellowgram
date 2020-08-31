import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import useFetch from '../../../hooks/useFetch';
import { updateBio } from '../../../redux/actions';

const EditBioInput = ({ bio, closeModal }) => {
  const { request } = useFetch();
  const dispatch = useDispatch();

  const [newBio, setNewBio] = useState(bio || '');
  const [leftCharacters, setLeftCharacters] = useState(64 - bio.length);

  const changeBio = (e) => {
    setNewBio(e.target.value);
    setLeftCharacters(64 - e.target.value.length);
  };

  const submitBio = async () => {
    const result = await request('/api/user/bio', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bio: newBio }),
    });

    if (result.success) {
      console.log('Bio updated');
      closeModal(null);
      dispatch(updateBio({ newBio }));
      setNewBio('');
    }
  };

  return (
    <div>
      <textarea
        maxLength={64}
        value={newBio}
        name='message'
        autoFocus
        id='message'
        rows='4'
        className='form-input'
        onChange={changeBio}
      ></textarea>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <button className='green' onClick={submitBio}>
          Submit
        </button>
        <p style={{color: !leftCharacters && 'red'}}>{leftCharacters}</p>
      </div>
    </div>
  );
};

export default EditBioInput;
