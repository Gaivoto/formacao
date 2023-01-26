const serDipl = require('../services/diploma.js');

async function getUserDiplomas(req, res){
    serDipl.getUserDiplomas({access_token: req.headers['authorization'].split(' ')[1], refresh_token: req.headers.refreshtoken}, req.params.id).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

module.exports = {
    getUserDiplomas: getUserDiplomas
}