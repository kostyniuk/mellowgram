'use strict';

const express = require('express');

const { findIdByUserName, personInfoById } = require('../../lib/sqlUtils');
const db = require('../../config/db');

const profilePictureRoute = require('./profilePicture');
const isLoggedIn = require('../../lib/isLoggedIn');
const router = express.Router();

const { validPassword } = require('../../lib/passwordUtils');

router.get('/:username', async (req, res, next) => {
  try {
    const { username } = req.params;

    const id = await findIdByUserName(username);

    if (!id) {
      throw new Error(`No such user: ${username}`);
    }

    console.log({ id });

    const info = await personInfoById(id, res);

    res.json({ success: true, username, info });
  } catch (e) {
    res.status(404).json({ success: false, msg: e.message });
  }
});

router.post('/bio', isLoggedIn, async (req, res, next) => {
  try {
    const { bio } = req.body;
    const { user_id } = req.user;

    const query = `UPDATE Person SET bio = $1 WHERE person_id = $2;`;
    const params = [bio, user_id];

    const result = await db.query(query, params);

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

    const updUser = 'UPDATE User_info SET username=$2 WHERE user_id=$1';
    const paramsUser = [user_id, username];

    const updPerson =
      'UPDATE Person SET email=$2, fullname=$3, based_in=$4, occupation=$5, phone_number=$6 WHERE person_id=$1';
    const paramsPerson = [
      user_id,
      email,
      fullname,
      based_in,
      occupation,
      phone_number,
    ];

    const promises = [
      db.query(updUser, paramsUser),
      db.query(updPerson, paramsPerson),
    ];

    const updated = await Promise.allSettled(promises);
    updated.forEach((result) => {
      if (result.status === 'rejected') {
        let e = null;
        console.log(result.reason.detail);
        if (result.reason.detail.includes('username')) {
          e = 'This username is already taken.';
        } else if (result.reason.detail.includes('email')) {
          e = 'This email is already used.';
        }
        throw new Error(e);
      }
    });

    return res.json({
      success: true,
      msg: 'User information successfully updated',
    });
  } catch (e) {
    // e.message is where your error string
    return res.status(409).json({ success: false, msg: e.message });
  }
});

router.delete('/delete', isLoggedIn, async (req, res, next) => {
  try {
    const { password } = req.body;
    const { user_id, username } = req.user;

    const query = `SELECT password from User_info WHERE user_id=$1`;
    const params = [user_id];

    const { rows } = await db.query(query, params);

    const hashed = rows[0].password;

    const approved = await validPassword(password, hashed);

    if (!approved) {
      throw new Error('Wrong password provided');
    }

    const deleteQuery = `DELETE FROM User_info WHERE user_id=$1`;
    const deleteParams = [user_id];

    const deleted = await db.query(deleteQuery, deleteParams);

    console.log({ deleted });

    if (deleted.rowCount === 1) {
      res.clearCookie('connect.sid');
      res.json({ success: true, msg: `User ${username} successfully deleted` });
    }
  } catch (e) {
    res.status(401).json({ success: false, msg: e.message });
  }
});

router.use('/:nickname', profilePictureRoute);

module.exports = router;
