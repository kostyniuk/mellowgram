'use strict';

const express = require('express');

const { findIdByUserName, personInfoById } = require('../../../lib/sqlUtils');
const db = require('../../../config/db');

const profilePictureRoute = require('./profilePicture');
const isLoggedIn = require('../../../lib/isLoggedIn');
const router = express.Router();

const { validPassword } = require('../../../lib/passwordUtils');

const _ = require('lodash');

router.get('/:username', async (req, res, next) => {
  try {
    const { username } = req.params;

    const id = await findIdByUserName(username);

    if (!id) {
      throw new Error(`No such user: ${username}`);
    }

    const info = await personInfoById(id, res);

    res.json({ success: true, username, info });
  } catch (e) {
    res.status(404).json({ success: false, msg: e.message });
  }
});

router.put('/bio', isLoggedIn, async (req, res, next) => {
  try {
    const { bio } = req.body;
    const { user_id } = req.user;

    const query = `UPDATE Person SET bio = $1 WHERE person_id = $2;`;
    const params = [bio, user_id];

    const result = await db.query(query, params);

    res.status(200).json({ success: true, message: `Bio updated: '${bio}'` });
  } catch (e) {
    res.status(400).json({ success: false });
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
      age
    } = req.body;

    console.log({username})

    const updUser = 'UPDATE User_info SET username=$2 WHERE user_id=$1';
    const paramsUser = [user_id, username];

    const updPerson =
      'UPDATE Person SET email=$2, fullname=$3, based_in=$4, occupation=$5, phone_number=$6, age=$7 WHERE person_id=$1';
    const paramsPerson = [
      user_id,
      email,
      fullname,
      based_in,
      occupation,
      phone_number,
      age
    ];

    if (!_.trim(username)) throw new Error('Username cannot be empty')
    if (!_.trim(email)) throw new Error('Email cannot be empty')
    if (!_.trim(fullname)) throw new Error('Full name cannot be empty')

    const promises = [
      db.query(updUser, paramsUser),
      db.query(updPerson, paramsPerson),
    ];

    const updated = await Promise.allSettled(promises);
    updated.forEach((result) => {
      if (result.status === 'rejected') {
        let e = null;
        console.log({result})
        if(result.reason.code === '22P02') {
          console.log('here')
          e = 'Age must a number'
        } else if (result.reason.detail.includes('username')) {
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

router.put('/location', async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const { location } = req.body;

    const query = `UPDATE Person SET based_in = $2 WHERE person_id = $1`;
    const params = [user_id, location];

    const result = await db.query(query, params);

    if (result.rowCount) {
      return res.json({ success: true, location });
    }

    return res.json({ success: false });
  } catch (e) {
    res.json({ success: false });
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
