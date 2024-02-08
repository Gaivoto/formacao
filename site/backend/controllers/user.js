const serUser = require('../services/user.js');

async function getUser(req, res){
    serUser.getUser({access_token: req.headers['authorization'].split(' ')[1], refresh_token: req.headers.refreshtoken}, req.params.id).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function getAllUsers(req, res){
    serUser.getAllUsers({access_token: req.headers['authorization'].split(' ')[1], refresh_token: req.headers.refreshtoken}).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function updateUser(req, res) {
    serUser.updateUser({access_token: req.headers['authorization'].split(' ')[1], refresh_token: req.headers.refreshtoken}, req.params.id, req.body).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function createUser(req, res) {
    serUser.createUser(req.body).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function changeUserState(req, res) {
    serUser.changeUserState({access_token: req.headers['authorization'].split(' ')[1], refresh_token: req.headers.refreshtoken}, req.params.id, req.body).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

module.exports = {
    createUser: createUser,
    getUser: getUser,
    updateUser: updateUser,
    changeUserState: changeUserState,
    getAllUsers: getAllUsers
}