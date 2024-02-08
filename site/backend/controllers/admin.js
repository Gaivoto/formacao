const serAdm = require('../services/admin.js');

async function getAllAdmins(req, res){
    serAdm.getAllAdmins({access_token: req.headers['authorization'].split(' ')[1], refresh_token: req.headers.refreshtoken}).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

module.exports = {
    getAllAdmins: getAllAdmins
}