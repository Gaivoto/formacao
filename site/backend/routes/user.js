const express = require('express');

const router = express.Router();

const cntrUser = require('../controllers/user.js');

//CHECK WITH THE REST OF THE SCOOBY GANG
router.post("/", cntrUser.createUser);


module.exports = router