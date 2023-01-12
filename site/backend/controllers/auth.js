const serAuth = require('../services/auth.js');

async function login(req, res){
    serAuth.login(req.body.username, req.body.password).then(value => {
        res.status(value.code).send({user: value.user, access_token: value.access_token, refresh_token: value.refresh_token});
    })
    .catch(error => {
        res.status(error.code).send(error.message);
        console.log(error.message);
    });
}

async function logout(req, res){
    serAuth.logout(req.headers.refreshtoken).then(value => {
        res.status(value.code).send();
    })
    .catch(error => {
        res.status(error.code).send(error.message);
        console.log(error.message);
    });
}


module.exports = {
    login: login,
    logout: logout
}