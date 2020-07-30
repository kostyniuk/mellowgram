'use strict';

const express = require('express');
const router = express.Router();

const db = require('../config/db');

const isLoggedIn = require('../lib/isLoggedIn.js');

const fetchEssentInfo = require('../lib/fetchUserEssentialInfo');

const alreadyLikedByCurrentUser = (info, userId) => {
  if (!userId) return false;
  const ids = [];
  info.map((obj) => ids.push(obj.person_id));
  return ids.includes(Number(userId));
};

router.get('/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params;
    let user_id = undefined;

    if (req.user !== undefined) {
      user_id = req.user.user_id;
    }

    const query = `SELECT from_id FROM Likes WHERE post_id = $1`;
    const params = [postId];

    let { rows } = await db.query(query, params);

    if (rows.length) {
      const userIds = rows.map((obj) => Object.values(obj)).flat();

      const data = await fetchEssentInfo(userIds);

      res.status(200).json({
        id: postId,
        data,
        alreadyLiked: alreadyLikedByCurrentUser(data, user_id),
      });
    } else {
      res.status(200).json({ id: postId, data: [], alreadyLiked: false });
    }
  } catch (e) {
    console.error(e);
  }
});

router.post('/:postId', isLoggedIn, async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { user_id } = req.user;

    const query = `INSERT INTO Likes (post_id, from_id) VALUES ($1, $2)`;
    const params = [postId, user_id];
    const { rows } = await db.query(query, params);

    const query2 = `UPDATE Post SET number_of_likes = number_of_likes + 1
    WHERE post_id = $1;`;
    const params2 = [postId];

    const result = await db.query(query2, params2);
    console.log({ data: result });

    res.status(200).json({ success: true, user_id, postId });
  } catch (e) {
    console.error(e);
    res.status(409).json({ success: false, msg: e });
  }
});

router.delete('/:postId', isLoggedIn, async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { user_id } = req.user;

    const query = `DELETE FROM Likes WHERE (post_id = $1 AND from_id = $2);`;
    const params = [postId, user_id];
    const deleted = await db.query(query, params);
    if (deleted.rowCount) {
      const query2 = `UPDATE Post SET number_of_likes = number_of_likes - 1
    WHERE post_id = $1;`;
      const params2 = [postId];

      const result = await db.query(query2, params2);
      console.log({ data: result });
      res.status(200).json({ message: 'Unliked' });
    } else {
      res.status(400).json({ error: 'Unable to unlike' });
    }
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
