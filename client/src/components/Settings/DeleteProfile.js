import React from 'react';

import Table from './Table';


const DeleteProfile = ({deleteHadlerOnChange, deleteHandlerOnClick, wrongPassword, passwordToDelete}) => {
  return (
    <div>
      <form>
        <h1>Delete your profile</h1>
        <h2>
          Are you sure you want to delete your profile ?<br /> All your matchs
          will be lost...
        </h2>
        <div className='input-group'>
          <Table
            tab='edit'
            data={{
              Password: passwordToDelete,
            }}
            handler={deleteHadlerOnChange}
          />
          <button
            type='button'
            className='green'
            onClick={deleteHandlerOnClick}
          >
            Submit
          </button>
          {wrongPassword && (
            <h2 style={{ color: 'red', marginTop: '10px' }}>Wrong password</h2>
          )}
        </div>
      </form>
    </div>
  );
};

export default DeleteProfile;
