const express = require('express');

const router = express.Router();

const cntrCurs = require('../controllers/curso.js');

router.get("/:id", cntrCurs.getCurso);

router.get("/", cntrCurs.getAllCursos);

router.post("/", cntrCurs.createCurso);

router.put("/", cntrCurs.removeCurso);

router.put("/edit/", cntrCurs.updateCurso);


module.exports = router