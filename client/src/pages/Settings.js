import React from 'react';
import '../styles/account.css';

import SettingsCard from '../components/Settings/SettingsCard';
import Header from '../components/Header/Header';

const Settings = () => {
  return (
    <div>
      <Header />
      <SettingsCard />
    </div>
  );
};

export default Settings;
