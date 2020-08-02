'use strict';

const express = require('express');
const router = express.Router();

const db = require('../config/db');

const fetchEssentInfo = require('../lib/fetchUserEssentialInfo');

router.get('/following/:username', async (req, res, next) => {
  try {
    let { username } = req.params;

    console.log({ username });

    const query = `SELECT followed_id FROM Follow WHERE following_id = (SELECT user_id FROM user_info WHERE username=$1);`;
    const params = [username];
    const { rows } = await db.query(query, params);

    if (rows.length) {
      const userIds = rows.map((obj) => Object.values(obj)).flat();

      const data = await fetchEssentInfo(userIds);

      return res.status(200).json({ success: true, data });
    }

    return res.status(200).json({ success: true, data: rows });
  } catch (e) {
    res.status(404).json({ success: false });
    console.error(e);
  }
});

//make followers and following not depending on being auth
// get follow/followers/username like that

router.get('/followers/:username', async (req, res, next) => {
  try {
    let { username } = req.params;

    console.log({ username });
    const query = `SELECT following_id FROM Follow WHERE followed_id = (SELECT user_id FROM user_info WHERE username=$1);`;

    const params = [username];
    const { rows } = await db.query(query, params);

    if (rows.length) {
      const userIds = rows.map((obj) => Object.values(obj)).flat();

      const data = await fetchEssentInfo(userIds);

      return res.status(200).json({ success: true, data });
    }

    return res.status(200).json({ success: true, data: rows });
  } catch (e) {
    res.status(404).json({ success: false });
    console.error(e);
  }
});

router.post('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { user_id } = req.user;

    if (user_id !== userId) {
      const query = `INSERT INTO Follow (following_id, followed_id) VALUES ($1, $2);`;
      const params = [user_id, userId];
      const result = await db.query(query, params);
      console.log({ result });

      if (result.rowCount) {
        return res
          .status(200)
          .json({ success: true, follower: req.user.username });
      }
    }
    return res
      .status(403)
      .json({ success: false, msg: `It's forbidden to follow yourself` });
  } catch (e) {
    res.status(404).json({ success: false, msg: e.detail });
  }
});

router.delete('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { user_id } = req.user;

    if (user_id !== userId) {
      const query = `DELETE FROM Follow WHERE (following_id = $1 AND followed_id = $2);`;
      const params = [user_id, userId];

      const result = await db.query(query, params);
      console.log({ result });
      if (result.rowCount) {
        return res
          .status(200)
          .json({ success: true, follower: req.user.username });
      }
    }
    return res.status(403).json({
      success: false,
      msg: `No user with id: ${userId}`,
    });
  } catch (e) {
    res.status(404).json({ success: false, msg: e.detail });
  }
});

module.exports = router;
