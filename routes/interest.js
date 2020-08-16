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
    res.json({ success: false, msg: e });
  }
});

router.get('/:username', async (req, res, next) => {
  try {
    const { username } = req.params;

    const query = `SELECT * FROM interest WHERE interest_id in (SELECT interest_id FROM users_interests_map WHERE user_id = (SELECT user_id FROM user_info WHERE username = $1))`;

    const { rows } = await db.query(query, [username]);

    res.json({ success: true, interests: rows });
  } catch (e) {
    res.json({ success: false, msg: e });
    console.log(e);
  }
});

module.exports = router;
