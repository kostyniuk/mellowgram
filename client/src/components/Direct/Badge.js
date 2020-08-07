import React from 'react';

import '../../styles/badge.css';

const Badge = ({ size, status, content }) => {
  return (
    <div>
      <span className={`badge badge--${status} badge--${size}`}>{content}</span>
    </div>
  );
};

export default Badge;
