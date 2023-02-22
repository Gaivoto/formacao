const utils = require('../utils/index.js');
const dbAdm = require('../db/admin.js');

async function getAllAdmins(tokens) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;
            if (info.user.type == "admin") {
                dbAdm.getAllAdmins().then(value2 => {
                    info.admins = value2;
                    resolve({ code: 200, info: info });
                })
                .catch(error => {
                    console.log(error);
                    reject({ code: 400, error: { message: "backendQueryError" } });
                })
            } else {
                reject({ code: 403, error: { message: "forbidden" } });
            }
        })
        .catch(error => {
            console.log(error);
            reject({ code: 401, error: { message: "invalidToken" } });
        })
    })
}

module.exports = {
    getAllAdmins: getAllAdmins
}