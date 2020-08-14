import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import useFetch from '../../hooks/useFetch';
import { updateBio } from '../../redux/actions';

const EditBioInput = ({ bio, closeModal }) => {
  const { request } = useFetch();
  const dispatch = useDispatch();

  const [newBio, setNewBio] = useState(bio || '');

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
        value={newBio}
        name='message'
        autoFocus
        id='message'
        rows='4'
        className='form-input'
        onChange={(e) => setNewBio(e.target.value)}
      ></textarea>
      <button className='green' onClick={submitBio}>
        Submit
      </button>
    </div>
  );
};

export default EditBioInput;
