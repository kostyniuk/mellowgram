const express = require('express');
const router = express.Router();

const db = require('../config/db');

router.get('/', async (req, res, next) => {
  try {
    const query = 'SELECT * FROM Interest ORDER BY interest_id;';
    const { rows } = await db.query(query, []);
    if (rows) return res.status(200).json({ success: true, interests: rows });
    return res.json({ success: false });
  } catch (e) {
    res.json({ success: false });
  }
});

module.exports = router;
