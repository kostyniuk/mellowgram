const express = require('express');
const db = require('../../../config/db');
const router = express.Router();

router.get('/:part', async (req, res, next) => {
  const { part } = req.params;
  const query = `SELECT * FROM User_info WHERE username::text LIKE '%${part}%';`;
  const params = [];
  const { rows } = await db.query(query, params);
  console.log({ rows });
  const usernames = rows.map((obj) => obj.username);

  const responce = usernames.map((username) => ({
    value: username,
    label: username,
  }));
  console.log({ responce });
  return res.json(responce);
});

module.exports = router;
