'use strict';

const express = require('express');
const router = express.Router();

const db = require('../config/db');

// All chat logic will be handled in ws server. Here si only creation and deletion of rooms

router.post('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { user_id } = req.user;

    if (user_id !== userId) {
      const query = `INSERT INTO Room (user1_id, user2_id) VALUES ($1, $2);`;
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
      const query = `DELETE FROM Room WHERE (user1_id = $1 AND user2_id = $2) OR (user1_id = $2 AND user2_id = $1);`;
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
