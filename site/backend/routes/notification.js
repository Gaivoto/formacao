const express = require('express');

const router = express.Router();

const cntrNotif = require('../controllers/notification.js');

router.get("/:id", cntrNotif.getAllNotifFromUser);

router.put("/:id", cntrNotif.updateNotifFromUse);

module.exports = router;