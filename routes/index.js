const express = require('express');
const router = express.Router();

const db = require('../config/db');

const signupRoute = require('./signup');
const loginRoute = require('./login');
const userRoute = require('./user/user');
const findUserRoute = require('./user/findUser');
const logoutRoute = require('./logout');
const likeRoute = require('./like');
const whoamiRoute = require('./whoami');
const followRoute = require('./follow');
const postRoute = require('./post');
const chatRoute = require('./chat')

router.use('/api/whoami', whoamiRoute);
router.use('/api/signup', signupRoute);
router.use('/api/login', loginRoute);
router.use('/api/user', userRoute);
router.use('/api/findUser', findUserRoute);
router.use('/api/logout', logoutRoute);
router.use('/api/like', likeRoute);
router.use('/api/follow', followRoute);
router.use('/api/post', postRoute);
router.use('/api/chat', chatRoute)

router.use('/api/test', (req, res, next) => {
  console.log(req.user);

  res.json('12');
});

router.use('/api/db', async (req, res, next) => {
  console.log(req.user);
  const { rows } = await db.query('select * from user_info;');
  res.json(rows);
});

module.exports = router;
