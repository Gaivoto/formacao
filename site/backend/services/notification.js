const dbNotif = require('../db/notification.js');
const utils = require('../utils/index.js');
//const dbUser = require('../db/user.js')

async function getAllNotifFromUser(tokens, id) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;
            if(info.user.id == "") {
                reject({ code: 404, error: { message: "Este utilizador não existe." }});
            }
            else if(info.user.id != id) {
                reject({ code: 404, error: { message: "Id inválido para buscar essas notificações. " }});
            } else {
                dbNotif.getAllNotifFromUser(id).then(value2 => {
                    info.notifications = value2;
                    resolve({ code: 200, info: info });
                })
                .catch(error => {
                    console.log(error);
                    reject({ code: 400, error:{ message: "Algo correu mal com a query." }});
                })
            }
        })
        .catch(error => {
            console.log(error);
            reject({ code: 401, error: { message: "Token inválido." } });
        })
    })
}

async function updateNotifFromUser(tokens, id) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;
            if(info.user.id == "") {
                reject({ code: 404, error: { message: "Este utilizador não existe." }});
            }
            else if(info.user.id != id) {
                reject({ code: 404, error: { message: "Id inválido para buscar essas notificações. " }});
            } else {
                dbNotif.updateNotifFromUser(id).then(value2 => {
                    resolve({ code: 200, info: info })
                })
                .catch(error => {
                    console.log(error);
                    reject({ code: 400, error: { message: "Algo correu mal com a query." }});
                });
            }
        })
        .catch(error => {
            console.log(error);
            reject({ code: 401, error: { message: "Token inválido." }});
        });
    })
}



module.exports = {
    getAllNotifFromUser: getAllNotifFromUser,
    updateNotifFromUser: updateNotifFromUser
}