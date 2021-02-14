import React, { useState } from 'react';
import SelectLanguages from './SelectLanguages';

const EditLanguages = ({ sendNewLanguages }) => {
    const [selectedLanguages, setselectedLanguages] = useState(null);

    return (
        <div className='settings_edit_interests'>
            <div>
                <h1>Edit languages</h1>
                <SelectLanguages setSelectLanguages={setselectedLanguages} />
            </div>
            <button className='btn green' onClick={() => sendNewLanguages(selectedLanguages)}>
                Submit
            </button>
        </div>
    );
};

export default EditLanguages;
