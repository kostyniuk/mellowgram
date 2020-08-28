import React from 'react';

import Table from './Table';

const ChangePassword = () => {
  return (
    <div>
      <form onSubmit={() => console.log('Submitted')}>
        <h1>Change password</h1>
        <Table
          tab='edit'
          data={{
            'Old Password': '',
            'New Password': '',
            'Confirm new password': '',
          }}
        />
        <button className='btn green'>Submit</button>
      </form>
    </div>
  );
};

export default ChangePassword;
