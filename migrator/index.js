const express = require('express');
const router = express.Router();

const languageRoute = require('./language')

router.use('/migrate-language', languageRoute);

module.exports = router;
