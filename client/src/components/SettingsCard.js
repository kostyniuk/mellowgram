import React from 'react';

class SettingsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openTab: 0,
    };
    this.switchTab = this.switchTab.bind(this);
  }

  switchTab(index) {
    this.setState({ openTab: index });
  }

  render() {
    const { openTab } = this.state;

    return (
      <div className='settings-container'>
        <div className='left-column'>
          <ul>
            <li onClick={this.switchTab.bind(this, 0)}>
              <i className='fa fa-user'></i>Overview
            </li>
            <hr />
            <li onClick={this.switchTab.bind(this, 1)}>
              <i className='fa fa-lock'></i>Change Password
            </li>
            <hr />

            <li onClick={this.switchTab.bind(this, 2)}>
              <i className='fa fa-ban'></i>Blocking
            </li>
            <hr />

            <li onClick={this.switchTab.bind(this, 3)}>
              <i className='fa fa-minus-circle'></i>Delete profile
            </li>
          </ul>
        </div>
        <div className='settings-tab'>
          {openTab === 0 && (
            <form>
              <h1>Account overview</h1>
              <div className='settings-overview'>
                <i>Username</i>
              </div>
            </form>
          )}
          {openTab === 1 && (
            <form>
              <h1>Change password</h1>
              <div className='input-group'>
                <input type='password' />
                <label>old password</label>
              </div>
              <div className='input-group'>
                <input type='password' />
                <label>new password</label>
              </div>
              <div className='input-group'>
                <input type='password' />
                <label>new password confirmation</label>
              </div>
              <div className='btnSettings'>Save Change</div>
            </form>
          )}
          {openTab === 2 && (
            <form>
              <h1>Manage blocked profiles</h1>
              <div className='profiles'>
                <img
                  className='select'
                  src='https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
                />
                <img src='https://images.unsplash.com/photo-1495078065017-564723e7e3e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1300&q=80' />
              </div>
              <div className='btnSettings'>Unblock</div>
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
                <input type='password' />
                <label>password</label>
              </div>
              <div className='btnSettings'>Confirm</div>
            </form>
          )}
        </div>
      </div>
    );
  }
}

export default SettingsCard;
