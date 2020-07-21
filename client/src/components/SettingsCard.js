import React, { useState } from 'react';
import Table from './Table';

import '../styles/table.css';

const SettingsCard = () => {
  const [openTab, setOpenTab] = useState(0);

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
              <img src='/api/public/uploads/dloading.jpg'></img>
              <Table tab='overview' />
            </div>
          </form>
        )}
        {openTab === 1 && (
          <form className='settings-form'>
            <h1>Edit profile</h1>
            <div className='settings-overview'>
              <Table tab='edit' />
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

// class SettingsCard extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       openTab: 0,
//     };
//     this.switchTab = this.switchTab.bind(this);
//   }

//   switchTab(index) {
//     this.setState({ openTab: index });
//   }

//   render() {
//     const { openTab } = this.state;

//   }
// }

export default SettingsCard;
