import React from 'react';

import Table from '../Table';
import UploadButton from '../EditProfile/UploadButton';

const Overview = ({ info, adjustedOverwiew }) => {
  return (
    <div className='settings-overview'>
      <h1>Account overview</h1>
      <div className='settings-overview-img'>
        <img src={info.picture} alt='avatar'></img>
        <UploadButton />
      </div>
      <div className='settings-overview-table'>
        <Table tab='overview' data={adjustedOverwiew} />
      </div>
    </div>
  );
};

export default Overview;
