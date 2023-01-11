const express = require('express');

const router = express.Router();

const cntrUser = require('../controllers/user.js');


router.get("/:id", cntrUser.getUser);

module.exports = router