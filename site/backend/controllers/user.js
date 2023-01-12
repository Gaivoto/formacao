const serUser = require('../services/user.js');

async function getUser(req, res){
    serUser.getUser({access_token: req.headers['authorization'].split(' ')[1], refresh_token: req.headers.refreshtoken}, req.body).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.message);
    });
}

/*async function createUser(req, res){
    serUser.createUser({access_token: req.headers['authorization'].split(' ')[1], refresh_token: req.headers.refreshtoken}, req.body).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.message);
    });
}*/

module.exports = {
    //createUser: createUser,
    getUser: getUser,
}