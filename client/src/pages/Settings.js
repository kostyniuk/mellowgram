import React from 'react';
import '../styles/account.css';
import SettingsCard from '../components/SettingsCard';
import Header from '../components/Header/Header';

const Settings = ({ authorized }) => {
  return (
    <div>
      <Header authorized={authorized} />
      <SettingsCard />
    </div>
  );
};

export default Settings;
