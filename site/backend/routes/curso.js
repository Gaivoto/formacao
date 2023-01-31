const express = require('express');

const router = express.Router();

const cntrCurs = require('../controllers/curso.js');

router.get("/home", cntrCurs.getCursosHomePage);

router.get("/:id", cntrCurs.getCurso);

router.get("/", cntrCurs.getAllCursos);

router.get("/user/:id", cntrCurs.getAllUserCursos);

router.post("/", cntrCurs.createCurso);

router.put("/user/:id", cntrCurs.updateStateCursoUser);

router.put("/adm/:id", cntrCurs.updateStateCursoAdm);

router.put("/:id", cntrCurs.updateCurso);

module.exports = router