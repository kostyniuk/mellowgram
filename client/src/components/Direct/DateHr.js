import React from 'react';

import { motion } from 'framer-motion';

import '../../styles/hrCentered.css';

const DateHr = ({ date }) => {
  return (
    <motion.div layout>
      <hr className='hr-centered-text' data-content={date}></hr>
    </motion.div>
  );
};

export default DateHr;
