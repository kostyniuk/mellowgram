import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch';

const EditBioInput = ({ bio, closeModal }) => {
  const { request } = useFetch();

  const [newBio, setNewBio] = useState(bio || '');

  const submitBio = async () => {
    const result = await request('/api/user/bio', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bio: newBio }),
    });

    setNewBio('');

    if (result.success) {
      console.log('Bio updated');
      closeModal(null);
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
