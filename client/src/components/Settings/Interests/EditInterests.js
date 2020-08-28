import React, { useState } from 'react';
import SelectInterests from './SelectInterests';

const EditInterests = ({ sendNewActivities }) => {
  const [selectedActivities, setSelectActivities] = useState(null);

  return (
    <div className='settings_edit_interests'>
      <div>
        <h1>Edit interests</h1>
        <SelectInterests setSelectActivities={setSelectActivities} />
      </div>
      <button className='btn green' onClick={() => sendNewActivities(selectedActivities)}>
        Submit
      </button>
    </div>
  );
};

export default EditInterests;
