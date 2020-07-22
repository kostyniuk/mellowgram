import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Table from './Table';

import '../styles/table.css';
import '../styles/btn.css';
import { deepCopy, deleteProperties } from '../helpers';
import UploadButton from './UploadButton';

const SettingsCard = () => {
  const [openTab, setOpenTab] = useState(0);

  const info = useSelector((state) => state.loggedInUser);

  const copy1 = deepCopy(info);
  const copy2 = deepCopy(info);

  const adjustedOverwiew = deleteProperties(copy1, [
    'id',
    'ready',
    'isAuthenticated',
    'picture',
  ]);
  const adjustedEdit = deleteProperties(copy2, [
    'id',
    'ready',
    'isAuthenticated',
    'picture',
    'number_of_posts',
  ]);

  const switchTab = (index) => setOpenTab(index);

  return (
    <div className='settings-container'>
      <div className='left-column'>
        <ul>
          <li onClick={switchTab.bind(null, 0)}>
            <i className='fa fa-user'></i>Overview
          </li>
          <hr />
          <li onClick={switchTab.bind(null, 1)}>
            <i className='fa fa-lock'></i>Edit Profile
          </li>
          <hr />
          <li onClick={switchTab.bind(null, 2)}>
            <i className='fa fa-lock'></i>Change Password
          </li>
          <hr />
          <li onClick={switchTab.bind(null, 3)}>
            <i className='fa fa-minus-circle'></i>Delete profile
          </li>
        </ul>
      </div>
      <div className='settings-tab'>
        {openTab === 0 && (
          <div className='settings-overview'>
            <h1>Account overview</h1>
            <div className='settings-overview-img'>
              <img src={info.picture}></img>
              <UploadButton />
            </div>
            <div className='settings-overview-table'>
              <Table tab='overview' data={adjustedOverwiew} />
            </div>
          </div>
        )}
        {openTab === 1 && (
          <form className='settings-form'>
            <h1>Edit profile</h1>
            <div className='settings-overview'>
              <Table tab='edit' data={adjustedEdit} />
              <button className='btn green'>Submit</button>
            </div>
          </form>
        )}
        {openTab === 2 && (
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
        )}
        {openTab === 3 && (
          <form>
            <h1>Delete your profile</h1>
            <h2>
              Are you sure you want to delete your profile ?<br /> All your
              matchs will be lost...
            </h2>
            <div className='input-group'>
              <Table
                tab='edit'
                data={{
                  Password: '',
                }}
              />
              <button type='button' className='green'>
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SettingsCard;
