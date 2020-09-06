'use strict';

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { nanoid } = require('nanoid');

const db = require('../config/db');

let id = null;

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (_, file, cb) {
    cb(null, id + '.' + file.originalname.split('.')[1]);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, //5 mb
});

const generateId = (req, res, next) => {
  id = nanoid();
  next();
};

router.post(
  '/',
  generateId,
  upload.single('picture'),
  async (req, res, next) => {
    try {
      const { user_id } = req.user;
      const ext = req.file.filename.split('.')[1];
      const path = '/api/public/uploads/' + id + '.' + ext;

      const {
        rows,
      } = await db.query(
        `INSERT INTO Picture (user_id, path) VALUES ($1, $2) RETURNING *;`,
        [user_id, path]
      );
      res.json({ success: true, data: rows });
    } catch (e) {
      res.json({ success: false });
      console.error(e);
    }
  }
);

router.get('/:username', async (req, res, next) => {
  try {
    const { username } = req.params;

    const { rows } = await db.query(
      `SELECT Picture.picture_id, Picture.user_id, Picture.created_at, Picture.path 
    FROM Picture
    JOIN user_info ON user_info.user_id = Picture.user_id
    WHERE user_info.username = $1 ORDER BY Picture.created_at DESC LIMIT 9;`,
      [username]
    );
    res.json({ success: true, pictures: rows });
  } catch (e) {
    res.json({ success: false });
    console.error(e);
  }
});

module.exports = router;
