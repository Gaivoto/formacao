const express = require('express');

const router = express.Router();

const cntrUser = require('../controllers/user.js');

router.get("/:id", cntrUser.getUser);

router.get("/", cntrUser.getAllUsers);

router.put("/:id", cntrUser.updateUser);

router.post("/", cntrUser.createUser);

router.put("/adm/:id", cntrUser.changeUserState);

module.exports = router