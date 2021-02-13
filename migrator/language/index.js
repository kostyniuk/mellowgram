const express = require('express');

const router = express.Router();

const {performMigration} = require('./retrieve');

router.get('/', performMigration)




module.exports = router;