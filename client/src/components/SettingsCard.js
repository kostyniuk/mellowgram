import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useFetch from '../hooks/useFetch';

import Table from './Table';
import UploadButton from './UploadButton';

import '../styles/table.css';
import '../styles/btn.css';

import { deepCopy, deleteProperties } from '../helpers';
import { updateProfileInfo } from '../redux/actions';

const SettingsCard = () => {

  const dispatch = useDispatch();
  const { request, loading, error } = useFetch();

  const info = useSelector((state) => state.loggedInUser);

  const [openTab, setOpenTab] = useState(0);
  const [edit, setEdit] = useState({
    username: info.username,
    based_in: info.based_in,
    email: info.email,
    fullname: info.fullname,
    occupation: info.occupation,
    phone_number: info.phone_number,
  });
  const [updatedInfo, setUpdatedInfo] = useState(false);

  const editHandler = (e) => {
    const field = e.target.name;
    if (updatedInfo) setUpdatedInfo(false);
    const { value } = e.target;
    setEdit((prev) => ({ ...prev, [field]: value }));
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    console.log({ edit });
    const responce = await request('/api/user/info', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(edit),
    });

    if (responce?.success) {
      setUpdatedInfo(true);
    }

    dispatch(updateProfileInfo(edit))
  };

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
          <hr class='HRsettings' />
          <li onClick={switchTab.bind(null, 1)}>
            <i className='fa fa-lock'></i>Edit Profile
          </li>
          <hr class='HRsettings' />
          <li onClick={switchTab.bind(null, 2)}>
            <i className='fa fa-lock'></i>Change Password
          </li>
          <hr class='HRsettings' />
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
            <div className='settings-overview'>
              <h1>Edit profile</h1>
              <Table tab='edit' data={edit} handler={editHandler} />
              <button className='btn green' onClick={submitEdit}>
                Submit
              </button>
              {error && (
                <h2 style={{ color: 'red', marginTop: '10px' }}>
                  Error: {error}
                </h2>
              )}
              {updatedInfo && (
                <h2 style={{ color: 'green', marginTop: '10px' }}>
                  Information updated
                </h2>
              )}
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
