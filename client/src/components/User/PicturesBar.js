import React from 'react';

import { motion } from 'framer-motion';

import '../../styles/picturesBar.css';

function PicturesBar({ setSelectedImg }) {
  const pictures = [
    { id: 1, url: '/api/public/uploads/user_kostyniuk.jpg' },
    { id: 2, url: '/api/public/uploads/user_dloading.jpg' },
    { id: 3, url: '/api/public/uploads/N6NCsEnf_6U9RvrfYNXpb.jpg' },
    { id: 4, url: '/api/public/uploads/user_tsunamipapi.jpg' },
  ];

  return (
    <div className='USER_INFO__picturesBar'>
      <h3 className='USER_INFO__picturesBar__title'>My pictures</h3>
      <div className='img-grid'>
        {pictures &&
          pictures.map((doc) => (
            <motion.div
              className='img-wrap'
              key={doc.id}
              layout
              onClick={() => setSelectedImg(doc.url)}
            >
              <motion.img
                src={doc.url}
                alt='uploaded pic'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              />
            </motion.div>
          ))}
      </div>
    </div>
  );
}

export default PicturesBar;
