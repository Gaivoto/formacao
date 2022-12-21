const serForn = require('../services/fornecedor.js');

async function getFornecedores(req, res){
    serForn.getFornecedores({access_token: req.headers['authorization'].split(' ')[1], refresh_token: req.headers.refreshtoken}).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.message);
    });
}

module.exports = {
    getFornecedores: getFornecedores
}