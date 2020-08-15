const express = require('express');
const router = express.Router();

const db = require('../config/db');

router.get('/', async (req, res, next) => {
  try {
    const query = 'SELECT * FROM Interest;';

    const { rows } = await db.query(query, []);

    console.log({ rows });

    if (rows) res.status(200).json({ success: true, interests: rows });
  } catch (e) {
    res.json({ success: false });
  }
});

module.exports = router;
