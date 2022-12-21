const serGast = require('../services/gasto.js');

async function getGastos(req, res){
    serGast.getGastos({access_token: req.headers['authorization'].split(' ')[1], refresh_token: req.headers.refreshtoken}).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.message);
    });
}

module.exports = {
    getGastos: getGastos
}