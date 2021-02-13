'use strict';

const express = require('express');

const router = express.Router();

// eslint-disable-next-line max-len
router.get('/', (req, res, next) => {
  res.clearCookie('connect.sid');
  res.json({ success: true });
});

module.exports = router;
