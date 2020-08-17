import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateProfileInfo } from '../redux/actions';
import useFetch from '../hooks/useFetch';

import { deepCopy, deleteProperties } from '../helpers';

import '../styles/table.css';
import '../styles/btn.css';
import Overview from './Settings/Overview';
import EditProfile from './Settings/EditProfile';
import EditInterests from './Settings/EditInterests';
import ChangePassword from './Settings/ChangePassword';
import DeleteProfile from './Settings/DeleteProfile';
import Tabs from './Settings/Tabs';

const SettingsCard = () => {
  const dispatch = useDispatch();
  const { request, error } = useFetch();

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

  const [passwordToDelete, setPasswordToDelete] = useState('');

  const [wrongPassword, setWrongPassword] = useState(false);

  const switchTab = (index) => setOpenTab(index);

  const editHandlerOnChange = (e) => {
    const field = e.target.name;
    if (updatedInfo) setUpdatedInfo(false);
    const { value } = e.target;
    setEdit((prev) => ({ ...prev, [field]: value }));
  };

  const deleteHadlerOnChange = (e) => {
    setPasswordToDelete(e.target?.value);
  };

  const submitEdit = async (e) => {
    e.preventDefault();
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

    dispatch(updateProfileInfo(edit));
  };

  const deleteHandlerOnClick = async () => {
    const responce = await request('/api/user/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: passwordToDelete }),
    });

    if (responce?.success) {
      window.location.href = '/login';
      window.location.reload(true);
    }
    setWrongPassword(true);
    setPasswordToDelete('');
  };

  const sendNewActivities = async () => {};

  const copy1 = deepCopy(info);

  const adjustedOverwiew = deleteProperties(copy1, [
    'id',
    'ready',
    'isAuthenticated',
    'picture',
    'interests',
  ]);

  return (
    <div className='settings-container'>
      <div className='left-column'>
        <Tabs switchTab={switchTab} />
      </div>
      <div className='settings-tab'>
        {openTab === 0 && (
          <Overview info={info} adjustedOverwiew={adjustedOverwiew} />
        )}
        {openTab === 1 && (
          <EditProfile
            edit={edit}
            editHandlerOnChange={editHandlerOnChange}
            error={error}
            submitEdit={submitEdit}
            updatedInfo={updatedInfo}
          />
        )}
        {openTab === 2 && (
          <EditInterests sendNewActivities={sendNewActivities} />
        )}
        {openTab === 3 && <ChangePassword />}
        {openTab === 4 && (
          <DeleteProfile
            deleteHadlerOnChange={deleteHadlerOnChange}
            deleteHandlerOnClick={deleteHandlerOnClick}
            wrongPassword={wrongPassword}
            passwordToDelete={passwordToDelete}
          />
        )}
      </div>
    </div>
  );
};

export default SettingsCard;
