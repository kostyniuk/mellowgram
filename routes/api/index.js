const express = require('express');
const router = express.Router();

const db = require('../../config/db');

const signupRoute = require('./signup');
const loginRoute = require('./login');
const userRoute = require('./user/user');
const findUserRoute = require('./user/findUser');
const logoutRoute = require('./logout');
const likeRoute = require('./like');
const whoamiRoute = require('./whoami');
const followRoute = require('./follow');
const postRoute = require('./post');
const chatRoute = require('./chat');
const interestRoute = require('./interest');
const searchRoute = require('./search');
const apiKeys = require('./apiKeys');
const picturesRoute = require('./pictures');

router.use('/api/whoami', whoamiRoute);
router.use('/api/signup', signupRoute);
router.use('/api/login', loginRoute);
router.use('/api/user', userRoute);
router.use('/api/findUser', findUserRoute);
router.use('/api/logout', logoutRoute);
router.use('/api/like', likeRoute);
router.use('/api/follow', followRoute);
router.use('/api/post', postRoute);
router.use('/api/chat', chatRoute);
router.use('/api/interest', interestRoute);
router.use('/api/search', searchRoute);
router.use('/api/pictures', picturesRoute);

router.use('/api/apiKeys', apiKeys);

module.exports = router;
