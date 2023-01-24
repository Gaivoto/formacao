const express = require('express');

const router = express.Router();

const cntrVide = require('../controllers/video.js');

router.get("/:id", cntrVide.getVideo);

router.get("/", cntrVide.getAllVideos);

router.post("/", cntrVide.createVideo);

router.delete("/:id", cntrVide.removeVideo);

router.put("/:id", cntrVide.updateVideo);

module.exports = router