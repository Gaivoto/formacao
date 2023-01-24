const express = require('express');

const router = express.Router();

const cntrUser = require('../controllers/user.js');

router.get("/:id", cntrUser.getUser);

router.put("/:id", cntrUser.updateUser);

router.post("/", cntrUser.createUser);

router.put("/adm/:id", cntrUser.changeUserState);

router.get("/profile/:id", cntrUser.profilePage);

module.exports = router