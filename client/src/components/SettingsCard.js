import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Table from './Table';

import '../styles/table.css';

import { deepCopy, deleteProperties } from '../helpers';

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
          <form className='settings-form'>
            <h1>Account overview</h1>
            <div className='settings-overview'>
              <div className='settings-overview-img'>
                <img src={info.picture}></img>
              </div>
              <div className='settings-overview-table'>
                <Table tab='overview' data={adjustedOverwiew} />
              </div>
            </div>
          </form>
        )}
        {openTab === 1 && (
          <form className='settings-form'>
            <h1>Edit profile</h1>
            <div className='settings-overview'>
              <Table tab='edit' data={adjustedEdit} />
              <button id='txt' className='btn-edit-sbm'>
                Submit
              </button>
            </div>
          </form>
        )}
        {openTab === 2 && (
          <form>
            <h1>Change password</h1>
            <div className='input-group'>
              <input type='password' id='txt' />
              <label>old password</label>
            </div>
            <div className='input-group'>
              <input type='password' id='txt' />
              <label>new password</label>
            </div>
            <div className='input-group'>
              <input type='password' id='txt' />
              <label>new password confirmation</label>
            </div>
            <button id='txt' className='btn-edit-sbm'>
              Submit
            </button>
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
              <label>password</label>
              <input type='password' id='txt' />
              <button type='button' className='btn-set'>
                <a>Submit</a>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SettingsCard;
