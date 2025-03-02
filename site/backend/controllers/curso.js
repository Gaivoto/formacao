const serCurs = require('../services/curso.js');

async function getCurso(req, res) {
    serCurs.getCurso(req.headers, req.params.id).then(value => {
        res.status(value.code).send(value.info);
    })
        .catch(error => {
            res.status(error.code).send(error.error);
        });
}

async function getAllCursos(req, res) {
    serCurs.getAllCursos(req.headers).then(value => {
        res.status(value.code).send(value.info);
    })
        .catch(error => {
            res.status(error.code).send(error.error);
        });
}

async function getAllUserCursos(req, res) {
    serCurs.getAllUserCursos({ access_token: req.headers['authorization'].split(' ')[1], refresh_token: req.headers.refreshtoken }, req.params.id).then(value => {
        res.status(value.code).send(value.info);
    })
        .catch(error => {
            res.status(error.code).send(error.error);
        });
}

async function createCurso(req, res) {
    serCurs.createCurso({ access_token: req.headers['authorization'].split(' ')[1], refresh_token: req.headers.refreshtoken }, req.body).then(value => {
        res.status(value.code).send(value.info);
    })
        .catch(error => {
            res.status(error.code).send(error.error);
        });
}

async function updateStateCursoUser(req, res) {
    serCurs.updateStateCursoUser({ access_token: req.headers['authorization'].split(' ')[1], refresh_token: req.headers.refreshtoken }, req.params.id, req.body).then(value => {
        res.status(value.code).send(value.info);
    })
        .catch(error => {
            res.status(error.code).send(error.error);
        });
}

async function updateStateCursoAdm(req, res) {
    serCurs.updateStateCursoAdm({ access_token: req.headers['authorization'].split(' ')[1], refresh_token: req.headers.refreshtoken }, req.params.id, req.body).then(value => {
        res.status(value.code).send(value.info);
    })
        .catch(error => {
            res.status(error.code).send(error.error);
        });
}

async function updateCurso(req, res) {
    serCurs.updateCurso({ access_token: req.headers['authorization'].split(' ')[1], refresh_token: req.headers.refreshtoken }, req.params.id, req.body).then(value => {
        res.status(value.code).send(value.info);
    })
        .catch(error => {
            res.status(error.code).send(error.error);
        });
}

async function getCursosHomePage(req, res) {
    serCurs.getCursosHomePage().then(value => {
        res.status(value.code).send(value.info);
    })
        .catch(error => {
            res.status(error.code).send(error.error);
        });
}

async function rateCourse(req, res) {
    serCurs.rateCourse({ access_token: req.headers['authorization'].split(' ')[1], refresh_token: req.headers.refreshtoken }, req.params.id, req.body).then(value => {
        res.status(value.code).send(value.info);
    })
        .catch(error => {
            res.status(error.code).send(error.error);
        });
}


module.exports = {
    getCurso: getCurso,
    getAllCursos: getAllCursos,
    createCurso: createCurso,
    updateStateCursoUser: updateStateCursoUser,
    updateStateCursoAdm: updateStateCursoAdm,
    updateCurso: updateCurso,
    getAllUserCursos: getAllUserCursos,
    getCursosHomePage: getCursosHomePage,
    rateCourse: rateCourse
}