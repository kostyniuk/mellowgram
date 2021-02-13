const { request } = require('express');

const express = require('express');

const router = express.Router();

router.get('/rapidApi', (req, res, next) => {
  res.json({ success: true, key: process.env.RAPID_API_KEY });
});

module.exports = router;
