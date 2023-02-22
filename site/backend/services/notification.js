const dbNotif = require('../db/notification.js');
const utils = require('../utils/index.js');

async function getAllNotifFromUser(tokens, id) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;
            if(info.user.id == "") {
                reject({ code: 404, error: { message: "noUser" }});
            } else if(info.user.id != id) {
                reject({ code: 403, error: { message: "forbidden" }});
            } else {
                dbNotif.getAllNotifFromUser(id).then(value2 => {
                    info.notifications = value2;
                    resolve({ code: 200, info: info });
                })
                .catch(error => {
                    console.log(error);
                    reject({ code: 400, error:{ message: "backendQueryError" }});
                })
            }
        })
        .catch(error => {
            console.log(error);
            reject({ code: 401, error: { message: "invalidToken" } });
        })
    })
}

async function updateNotifFromUser(tokens, id) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;
            if(info.user.id == "") {
                reject({ code: 404, error: { message: "noUser" }});
            } else if(info.user.id != id) {
                reject({ code: 404, error: { message: "forbidden" }});
            } else {
                dbNotif.updateNotifFromUser(id).then(value2 => {
                    resolve({ code: 200, info: info })
                })
                .catch(error => {
                    console.log(error);
                    reject({ code: 400, error: { message: "backendQueryError" }});
                });
            }
        })
        .catch(error => {
            console.log(error);
            reject({ code: 401, error: { message: "invalidToken" }});
        });
    })
}



module.exports = {
    getAllNotifFromUser: getAllNotifFromUser,
    updateNotifFromUser: updateNotifFromUser
}