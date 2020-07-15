/* eslint-disable new-cap */
'use strict';

const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const {genPassword, validPassword} = require('../lib/passwordUtils');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { email, fullName, username, password } = req.body;

    console.log(req.body)

    const hash = await genPassword(password, process.env.SALT);

    const queryUser = `INSERT INTO user_info (username, password) VALUES ($1, $2) RETURNING user_id;`;
    const valuesUser = [username, hash];
    let { rows } = await db.query(queryUser, valuesUser);

    console.log({rows})

    const id = rows[0].user_id;

    const queryPerson = `INSERT INTO person (person_id, fullName, email) VALUES ($1, $2, $3);`;
    const valuesPerson = [id, fullName, email];
    const result = await db.query(queryPerson, valuesPerson);

    res.json({success: true});
  } catch (e) {
    res.status(400).json({ success: false, msg: e.detail})
    console.error({ e });
  }
});

module.exports = router;
