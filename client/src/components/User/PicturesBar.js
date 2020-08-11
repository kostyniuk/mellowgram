import React from 'react';

import { motion } from 'framer-motion';

import '../../styles/picturesBar.css';

function PicturesBar({ setSelectedImg }) {
  const pictures = [
    { id: 1, url: 'https://as01.epimg.net/futbol/imagenes/2019/03/14/champions/1552569020_031070_1552569560_noticia_normal.jpg' },
    { id: 2, url: '/api/public/uploads/user_dloading.jpg' },
    { id: 3, url: '/api/public/uploads/N6NCsEnf_6U9RvrfYNXpb.jpg' },
    { id: 4, url: '/api/public/uploads/user_tsunamipapi.jpg' },
    { id: 5, url: '/api/public/uploads/user_dloading.jpg' },
    { id: 6, url: '/api/public/uploads/N6NCsEnf_6U9RvrfYNXpb.jpg' },
    { id: 7, url: '/api/public/uploads/user_tsunamipapi.jpg' },
    { id: 8, url: 'https://as01.epimg.net/futbol/imagenes/2019/03/14/champions/1552569020_031070_1552569560_noticia_normal.jpg' },
  ];

  return (
    <div className='USER_INFO__picturesBar'>
      <div className='USER_INFO_picturesBar_header'>
        <h3 className='USER_INFO__picturesBar__title'>My pictures &#8203; </h3>
        <div className='USER_INFO__picturesBar__add'>
          <div className='UPLOAD_btn_upload ADD_PICTURE'>
            <input type='file' id='UPLOAD_PROFILE_PICTURE' name='' />
            <i className='fa fa-plus' aria-hidden='true'></i>
          </div>
        </div>
      </div>
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
