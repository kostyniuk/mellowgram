import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { editAuth } from '../../redux/actions';
import useFetch from '../../hooks/useFetch';

import { deepCopy, deleteProperties } from '../../helpers';

import '../../styles/table.css';
import '../../styles/btn.css';
import Overview from './Tabs/Overview';
import EditProfile from './EditProfile/EditProfile';
import EditInterests from './Interests/EditInterests';
import ChangePassword from './Tabs/ChangePassword';
import DeleteProfile from './Tabs/DeleteProfile';
import Tabs from './Tabs';
import LocationTab from './Tabs/LocationTab';

const SettingsCard = () => {
  const dispatch = useDispatch();
  const { request, error } = useFetch();

  const info = useSelector((state) => state.loggedInUser);

  const [openTab, setOpenTab] = useState(0);
  const [edit, setEdit] = useState({
    username: info.username,
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

    dispatch(editAuth({ updatedFields: edit }));
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

  const sendNewActivities = async (e) => {
    let interests_ids = [];

    const method = e ? 'POST' : 'DELETE';

    if (method === 'POST') {
      interests_ids = e.map((interest) => interest.id);
    }

    const responce = await request('api/interest/', {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ interests_ids }),
    });

    if (responce.success) {
      dispatch(editAuth({ updatedFields: { interests: responce.interests } }));
    }
  };

  const copy1 = deepCopy(info);

  const adjustedOverwiew = deleteProperties(copy1, [
    'id',
    'ready',
    'isAuthenticated',
    'picture',
    'interests',
    'person_id',
    'uuid',
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
        {openTab === 1 && <LocationTab />}
        {openTab === 2 && (
          <EditProfile
            edit={edit}
            editHandlerOnChange={editHandlerOnChange}
            error={error}
            submitEdit={submitEdit}
            updatedInfo={updatedInfo}
          />
        )}
        {openTab === 3 && (
          <EditInterests sendNewActivities={sendNewActivities} />
        )}
        {openTab === 4 && <ChangePassword />}
        {openTab === 5 && (
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
