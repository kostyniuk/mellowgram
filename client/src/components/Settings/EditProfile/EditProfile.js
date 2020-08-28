import React from 'react';

import Table from '../Table';

const EditProfile = ({edit, editHandlerOnChange, submitEdit, error, updatedInfo}) => {
  return (
    <div className='settings-overview'>
      <h1>Edit profile</h1>
      <Table tab='edit' data={edit} handler={editHandlerOnChange} />
      <button className='btn green' onClick={submitEdit}>
        Submit
      </button>
      {error && (
        <h2 style={{ color: 'red', marginTop: '10px' }}>Error: {error}</h2>
      )}
      {updatedInfo && (
        <h2 style={{ color: 'green', marginTop: '10px' }}>
          Information updated
        </h2>
      )}
    </div>
  );
};

export default EditProfile;
