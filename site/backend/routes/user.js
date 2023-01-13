const express = require('express');

const router = express.Router();

const cntrUser = require('../controllers/user.js');

router.get("/:id", cntrUser.getUser);

router.put("/updateUser", cntrUser.updateUser);

router.post("/createUser", cntrUser.createUser);

module.exports = router