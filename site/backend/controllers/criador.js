const serCria = require('../services/criador.js');

async function getAllCriadores(req, res) {
    serCria.getAllCriadores(req.headers).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        console.log(error)
        res.status(error.code).send(error.error);
    });
}

async function getCriador(req, res) {
    serCria.getCriador(req.headers, req.params.id).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function updateCriador(req, res) {
    serCria.updateCriador({ access_token: req.headers['authorization'].split(' ')[1], refresh_token: req.headers.refreshtoken }, req.params.id, req.body).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function createCriador(req, res) {
    serCria.createCriador({ access_token: req.headers['authorization'].split(' ')[1], refresh_token: req.headers.refreshtoken }, req.body).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function changeCriadorState(req, res) {
    serCria.changeCriadorState({ access_token: req.headers['authorization'].split(' ')[1], refresh_token: req.headers.refreshtoken }, req.params.id, req.body).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function getCriadoresHomepage(req, res) {
    serCria.getCriadoresHomepage().then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

module.exports = {
    getAllCriadores: getAllCriadores,
    getCriador: getCriador,
    updateCriador: updateCriador,
    createCriador: createCriador,
    changeCriadorState: changeCriadorState,
    getCriadoresHomepage: getCriadoresHomepage,
}