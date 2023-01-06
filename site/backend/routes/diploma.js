const express = require('express');

const router = express.Router();

const cntrDipl = require('../controllers/diploma.js');

//CHECK WITH THE REST OF THE SCOOBY GANG
router.post("/", cntrDipl.createDiploma);


module.exports = router