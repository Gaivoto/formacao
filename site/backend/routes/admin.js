const express = require('express');

const router = express.Router();

const cntrAdm = require('../controllers/admin.js');

router.get("/", cntrAdm.getAllAdmins);

module.exports = router