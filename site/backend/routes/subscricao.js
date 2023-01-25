const express = require('express');

const router = express.Router();

const cntrSubs = require('../controllers/subscricao.js');

router.get("/:id", cntrSubs.getSubscricao);

router.get("/", cntrSubs.getAllSubscricoes);

router.post("/", cntrSubs.createSubscricao);

//router.post("/", cntrSubs.createSubscricao);

module.exports = router