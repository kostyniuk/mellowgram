import React from 'react';

const Tabs = ({ switchTab }) => {
  return (
    <div>
      <ul>
        <li onClick={() => switchTab(0)}>
          <i className='fa fa-user'></i>Overview
        </li>
        <hr class='HRsettings' />
        <li onClick={() => switchTab(1)}>
          <i className='fa fa-map-marker'></i>Edit Location
        </li>
        <hr class='HRsettings' />
        <li onClick={() => switchTab(2)}>
          <i className='fa fa-cog'></i>Edit Profile
        </li>
        <hr class='HRsettings' />
        <li onClick={() => switchTab(3)}>
          <i className='fa fa-list-alt'></i>Edit Interests
        </li>
        <hr className='HRsettings'/>
        <li onClick={() => switchTab(4)}>
          <i className='fa fa-list-alt'></i>Edit Languages
        </li>
        <hr class='HRsettings' />
        {/*<li onClick={() => switchTab(5)}>*/}
        {/*  <i className='fa fa-lock'></i>Change Password*/}
        {/*</li>*/}
        {/*<hr class='HRsettings' />*/}
        {/*<li onClick={() => switchTab(6)}>*/}
        {/*  <i className='fa fa-minus-circle'></i>Delete profile*/}
        {/*</li>*/}
      </ul>
    </div>
  );
};

export default Tabs;
