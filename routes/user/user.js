'use strict';

const express = require('express');

const { findIdByUserName, personInfoById } = require('../../lib/sqlUtils');
const db = require('../../config/db');

const postRoute = require('./post');
const profilePictureRoute = require('./profilePicture');
const isLoggedIn = require('../../lib/isLoggedIn');
const router = express.Router();

// multer config

//users handling
router.get('/:nickname', async (req, res, next) => {
  try {
    const { nickname } = req.params;

    const id = await findIdByUserName(nickname, res);

    const info = await personInfoById(id, res);

    res.json({ success: true, nickname, info });
  } catch (e) {
    res.json({ success: false, nickname });
    console.error(e);
  }
});

router.post('/bio', isLoggedIn, async (req, res, next) => {
  try {
    const { bio } = req.body;
    const { user_id } = req.user;

    const query = `UPDATE Person SET bio = $1 WHERE person_id = $2;`;
    const params = [bio, user_id];

    const result = await db.query(query, params);
    console.log({ result });

    res.status(200).json({ message: `Bio updated: '${bio}'` });
  } catch (e) {
    console.error({ e });
  }
});

router.put('/info', isLoggedIn, async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const {
      username,
      based_in,
      email,
      fullname,
      occupation,
      phone_number,
    } = req.body;
    console.log({
      username,
      based_in,
      email,
      fullname,
      occupation,
      phone_number,
    });

    const query1 = 'UPDATE User_info SET username=$2 WHERE user_id=$1';
    const params1 = [user_id, username];

    const resUsername = await db.query(query1, params1);

    console.log({ resUsername });

    const query2 =
      'UPDATE Person SET email=$2, fullname=$3, based_in=$4, occupation=$5, phone_number=$6 WHERE person_id=$1';
    const params2 = [
      user_id,
      email,
      fullname,
      based_in,
      occupation,
      phone_number,
    ];
    const { rows } = await db.query(query2, params2);
    console.log({ rows });
    return res.json({ success: true, msg: '/user/info route here' });
  } catch (e) {
    res.json({ success: false, msg: e.detail });
    console.log(e);
  }
});

router.use('/:nickname/post', postRoute);
router.use('/:nickname', profilePictureRoute);

module.exports = router;
