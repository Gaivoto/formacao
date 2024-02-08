const serNotif = require('../services/notification.js')

async function getAllNotifFromUser(req, res){
    serNotif.getAllNotifFromUser({access_token: req.headers['authorization'].split(' ')[1], refresh_token: req.headers.refreshtoken}, req.params.id).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function updateNotifFromUser(req, res){
    serNotif.updateNotifFromUser({access_token: req.headers['authorization'].split(' ')[1], refresh_token: req.headers.refreshtoken}, req.params.id).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

module.exports = {
    getAllNotifFromUser: getAllNotifFromUser,
    updateNotifFromUser: updateNotifFromUser
}