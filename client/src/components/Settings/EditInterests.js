import React from 'react';
import SelectInterests from '../SelectInterests';

const EditInterests = ({ sendNewActivities }) => {
  return (
    <div className='settings_edit_interests'>
      <div>
        <h1>Edit interests</h1>
        <SelectInterests />
      </div>
      <button className='btn green' onClick={sendNewActivities}>
        Submit
      </button>
    </div>
  );
};

export default EditInterests;
