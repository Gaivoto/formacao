const express = require('express');

const router = express.Router();

const cntrCria = require('../controllers/criador.js');

router.get("/", cntrCria.getAllCriadores);

router.get("/:id", cntrCria.getCriador);

router.post("/", cntrCria.createCriador);

router.put("/adm/:id", cntrCria.changeCriadorState);

router.put("/:id", cntrCria.updateCriador);

module.exports = router