const serComp = require('../services/compra.js');

async function getCompra(req, res){
    serComp.getCompra(req.headers, req.params.id).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function getAllCompras(req, res){
    serComp.getAllCompras(req.headers).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function createCompra(req, res){
    serComp.createCompra({access_token: req.headers['authorization'].split(' ')[1], refresh_token: req.headers.refreshtoken}, req.body).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

module.exports = {
    getCompra: getCompra,
    getAllCompras: getAllCompras,
    createCompra: createCompra,
}