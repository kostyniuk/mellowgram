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

router.post('/', async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const { interests_ids } = req.body;

    const promises = [];

    const deleting = await db.query(
      `DELETE FROM Users_Interests_Map WHERE user_id = $1`,
      [user_id]
    );
    interests_ids.forEach((interest_id) => {
      const query = `INSERT INTO Users_Interests_Map (user_id, interest_id) VALUES ($1, $2);`;
      promises.push(db.query(query, [user_id, interest_id]));
    });

    const responce = await Promise.all(promises);

    if (responce[0].rowCount) {
      return res.json({ success: true, responce });
    }
    return res.json({ success: false, responce });
  } catch (e) {
    if (e.code === '23505') {
      return res.json({ success: true, msg: e });
    }
    res.json({ success: false, msg: e });
  }
});

router.delete('/', async (req, res, next) => {
  try {
    const { user_id } = req.user;

    const responce = await db.query(
      `DELETE FROM Users_Interests_Map WHERE user_id = $1`,
      [user_id]
    );

    if (responce.command) {
      return res.json({ success: true, msg: 'Activities deleted' });
    }
    return res.json({ success: false, responce });
  } catch (e) {
    if (e.code === '23505') {
      return res.json({ success: true, msg: e });
    }
    res.json({ success: false, msg: e });
  }
});

module.exports = router;
