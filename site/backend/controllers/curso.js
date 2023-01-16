const serCurs = require('../services/curso.js');

async function getCurso(req, res){
    serCurs.getCurso({access_token: req.headers['authorization'].split(' ')[1], refresh_token: req.headers.refreshtoken}, req.params.id).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.message);
    });
}

async function getAllCursos(req, res){
    serCurs.getAllCursos(req.headers).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.message);
    });
}

async function createCurso(req, res){
    serCurs.createCurso({access_token: req.headers['authorization'].split(' ')[1], refresh_token: req.headers.refreshtoken}, req.body).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.message);
    });
}

async function removeCurso(req, res){
    serCurs.removeCurso({access_token: req.headers['authorization'].split(' ')[1], refresh_token: req.headers.refreshtoken}, req.body).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.message);
    });
}

async function updateCurso(req, res){
    serCurs.updateCurso({access_token: req.headers['authorization'].split(' ')[1], refresh_token: req.headers.refreshtoken}, req.body).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.message);
    });
}

module.exports = {
    getCurso: getCurso,
    getAllCursos: getAllCursos,
    createCurso: createCurso,
    removeCurso: removeCurso,
    updateCurso: updateCurso,
}