import React from 'react';

import '../../styles/badge.css';

const Badge = ({ size, status, content, place }) => {
  return (
    <div style={{marginLeft: place && '-5px', marginBottom: place && '15px' }}>
      <span className={`badge badge--${status} badge--${size}`}>{content}</span>
    </div>
  );
};

export default Badge;
