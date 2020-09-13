import React from 'react';

const MatchedRow = ({ name, color }) => {
  return (
    <div>
      <div style={{ padding: '20px' }}>
        <h4 style={{ color }}>✅ {name}</h4>
        <hr className='hr' style={{ padding: '0px 15px' }} />
      </div>
    </div>
  );
};

export default MatchedRow;
