const serSubs = require('../services/subscricao.js');

async function getSubscricao(req, res){
    serSubs.getSubscricao(req.headers, req.params.id).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function getAllSubscricoes(req, res){
    serSubs.getAllSubscricoes(req.headers).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function createSubscricao(req, res){
    serSubs.createSubscricao({access_token: req.headers['authorization'].split(' ')[1], refresh_token: req.headers.refreshtoken}, req.body).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

module.exports = {
    getSubscricao: getSubscricao,
    getAllSubscricoes: getAllSubscricoes,
    createSubscricao: createSubscricao,
}