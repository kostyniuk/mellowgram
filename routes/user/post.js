'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });
const isAvailable = require('../../lib/isOwnPage');
const db = require('../../config/db');

const transformCreationTime = require('../../lib/transformCreationTime');
const formatTime = require('../../lib/formatTime');

// posts handling
router.get('/', async (req, res, next) => {
  try {
    const { nickname } = req.params;

    const query = `SELECT post.post_id, post.caption, post.created_at, post.number_of_likes 
    FROM Post
    JOIN user_info ON user_info.user_id = post.creator_id
    WHERE user_info.username = $1
    ORDER BY post.post_id DESC;`;
    const parametrs = [nickname];

    const { rows } = await db.query(query, parametrs);
    let dates = rows.map((post) => transformCreationTime(post.created_at));
    const formated = dates.map(formatTime);
    const responce = rows.map((obj, i) => ({
      ...obj,
      created_at: formated[i],
    }));
    res.json(responce);
  } catch (e) {
    console.error(e);
  }
});

router.post('/', isAvailable, async (req, res, next) => {
  try {
    const { caption } = req.body;

    const { user_id } = req.user;

    const queryInsert = `INSERT INTO post (creator_id, caption) VALUES ($1, $2);`;
    const paramsInsert = [user_id, caption];

    const { rows } = await db.query(queryInsert, paramsInsert);

    const queryUpdateNumOfPosts = `UPDATE person SET number_of_posts = number_of_posts + 1 WHERE person_id = $1;`;
    const paramsUpdate = [user_id];

    const result = await db.query(queryUpdateNumOfPosts, paramsUpdate);

    res.json({
      message: 'The post was successfully created',
      username: req.user.username,
    });
  } catch (e) {
    console.error(e);
  }
});

router.put('/:id', isAvailable, async (req, res, next) => {
  try {
    const { caption } = req.body;
    const { id } = req.params;

    const queryInsert = `UPDATE post SET caption = $1 WHERE post_id = $2;`;
    const paramsInsert = [caption, id];

    await db.query(queryInsert, paramsInsert);

    res.json({
      message: 'The post was successfully updated',
      post: caption,
    });
  } catch (e) {
    console.error(e);
  }
});

router.delete('/:id', isAvailable, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_id } = req.user;

    const queryInsert = `DELETE FROM post WHERE post_id = $1`;
    const paramsInsert = [id];

    const { rows } = await db.query(queryInsert, paramsInsert);

    const queryUpdateNumOfPosts = `UPDATE person SET number_of_posts = number_of_posts - 1 WHERE person_id = $1;`;
    const paramsUpdate = [user_id];

    const result = await db.query(queryUpdateNumOfPosts, paramsUpdate);

    res.json({
      message: 'The post was successfully deleted',
      username: req.user.username,
    });
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
