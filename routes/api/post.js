'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });
const isAvailable = require('../../lib/isOwnPage');
const db = require('../../config/db');

const fetchEssentInfo = require('../../lib/fetchUserEssentialInfo');
const transformCreationTime = require('../../lib/transformCreationTime');
const formatTime = require('../../lib/formatTime');
const { formParams } = require('../../lib/sqlUtils');

router.get('/home', async (req, res, next) => {
  try {
    const { username, user_id } = req.user;

    let { limit, offset } = req.query;

    limit = limit || 100;
    offset = offset || 0;

    const query = `SELECT followed_id FROM Follow WHERE following_id = (SELECT user_id FROM user_info WHERE username=$1);`;
    const params = [username];
    const { rows } = await db.query(query, params);

    // if (rows.length) {
    let userIds = rows.map((obj) => Object.values(obj)).flat();
    userIds.push(user_id);
    const addParameters = formParams(userIds.length, 2);

    const queryPosts = `SELECT post_id, creator_id, caption, created_at, number_of_likes FROM Post
    WHERE creator_id in (${addParameters})
    ORDER BY post_id DESC OFFSET $1 LIMIT $2;`;
    const parametrsPosts = [offset, limit, ...userIds];

    const posts = await db.query(queryPosts, parametrsPosts);

    const creatorsInfo = await fetchEssentInfo(userIds);

    const patchedPosts = posts.rows.map((post) => {
      const { creator_id } = post;
      let date = transformCreationTime(post.created_at);
      const formated = formatTime(date);

      const creator = creatorsInfo.filter(
        (creator) => creator.person_id === creator_id
      )[0];
      return { ...post, created_at: formated, creatorInfo: creator };
    });

    return res.status(200).json({ success: true, posts: patchedPosts });
  } catch (e) {
    console.error(e);
    res.json({ success: false, posts: null });
  }
});

router.get('/:username', async (req, res, next) => {
  try {
    const { username } = req.params;

    let { limit, offset } = req.query;

    limit = limit || 100;
    offset = offset || 0;

    const query = `SELECT post.post_id, post.caption, post.created_at, post.number_of_likes 
    FROM Post
    JOIN user_info ON user_info.user_id = post.creator_id
    WHERE user_info.username = $1
    ORDER BY post.post_id DESC OFFSET $2 LIMIT $3;`;
    const parametrs = [username, offset, limit];

    const { rows } = await db.query(query, parametrs);
    let dates = rows.map((post) => transformCreationTime(post.created_at));
    const formated = dates.map(formatTime);
    const responce = rows.map((obj, i) => ({
      ...obj,
      created_at: formated[i],
    }));

    res.json({ success: true, posts: responce, username: username });
  } catch (e) {
    console.error(e);
    res.json({ success: false, posts: null });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { caption } = req.body;

    const { user_id } = req.user;

    const queryInsert = `INSERT INTO post (creator_id, caption) VALUES ($1, $2) RETURNING *;`;
    const paramsInsert = [user_id, caption];

    const { rows } = await db.query(queryInsert, paramsInsert);

    const queryUpdateNumOfPosts = `UPDATE person SET number_of_posts = number_of_posts + 1 WHERE person_id = $1;`;
    const paramsUpdate = [user_id];

    const result = await db.query(queryUpdateNumOfPosts, paramsUpdate);

    const data = formatTime(transformCreationTime(rows[0].created_at));
    res.json({
      success: true,
      rows: { ...rows[0], created_at: data },
      message: 'The post was successfully created',
      username: req.user.username,
    });
  } catch (e) {
    console.error(e);
    res.status(400).json({
      success: false,
      message: 'The post was not created',
    });
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { caption } = req.body;
    const { id } = req.params;

    // TODO: Check if whether creator is trying to alter the post or not

    const queryInsert = `UPDATE post SET caption = $1 WHERE post_id = $2;`;
    const paramsInsert = [caption, id];

    await db.query(queryInsert, paramsInsert);

    res.json({
      success: true,
      message: 'The post was successfully updated',
      post: caption,
    });
  } catch (e) {
    res.status(404).json({
      success: false,
      message: 'The post was successfully updated',
    });
    console.error(e);
  }
});

router.delete('/:id', async (req, res, next) => {
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
      success: true,
      msg: 'The post was successfully deleted',
      username: req.user.username,
    });
  } catch (e) {
    res.json({
      success: false,
      msg: 'The post was successfully deleted',
      username: req.user.username,
    });
    console.error(e);
  }
});

module.exports = router;
