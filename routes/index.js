const express = require('express');
const router = express.Router();

const signupRoute = require('./signup');
const loginRoute = require('./login');
const userRoute = require('./user/user');
const logoutRoute = require('./logout');
const likeRoute = require('./like');
const whoamiRoute = require('./whoami');
const followRoute = require('./follow');

router.use('/api/whoami', whoamiRoute);
router.use('/api/signup', signupRoute);
router.use('/api/login', loginRoute);
router.use('/api/user', userRoute);
router.use('/api/logout', logoutRoute);
router.use('/api/like', likeRoute);
router.use('/api/follow', followRoute);

router.use('/api/test', (req, res, next) => {
  res.json('12');
});

module.exports = router;
