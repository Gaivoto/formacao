const express = require('express');

const router = express.Router();

const cntrDipl = require('../controllers/diploma.js');

router.get("/:id", cntrDipl.getUserDiplomas);

module.exports = router