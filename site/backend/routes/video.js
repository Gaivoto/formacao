const express = require('express');

const router = express.Router();

const cntrVide = require('../controllers/video.js');

//CHECK WITH THE REST OF THE SCOOBY GANG
router.post("/", cntrVide.createVideo);


module.exports = router