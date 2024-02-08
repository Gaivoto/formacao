const express = require('express');

const router = express.Router();

const cntrNotif = require('../controllers/notification.js');

router.get("/user/:id", cntrNotif.getAllNotifFromUser);

router.put("/user/:id", cntrNotif.updateNotifFromUser);

module.exports = router;