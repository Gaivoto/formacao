const express = require('express');

const router = express.Router();

const cntrVide = require('../controllers/video.js');

router.get("/:id", cntrVide.getVideo);

router.get("/", cntrVide.getAllVideos);

router.post("/", cntrVide.createVideo);

router.put("/user/:id", cntrVide.updateStateVideoUser);

router.put("/adm/:id", cntrVide.updateStateVideoAdm);

router.put("/:id", cntrVide.updateVideo);

module.exports = router