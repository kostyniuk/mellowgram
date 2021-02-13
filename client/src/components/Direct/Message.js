import React from 'react';

import { motion } from 'framer-motion';
import DateHr from './DateHr';

const Message = ({ type, context, isOwner, date }) => {
  let className = 'MESSAGES__chat-msg ';

  if (isOwner) className += 'MESSAGES__owner';

  if (type) return <DateHr date={date} />;



  return (
    <motion.div layout className={className}>
      <div className='MESSAGES__chat-msg-content'>
        <div class='MESSAGES__chat-msg-text'>
          <div className='MESSAGES__chat-msg-text-context'>{context}</div>
          <div className='MESSAGES__chat-msg-date'>{date}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default Message;
