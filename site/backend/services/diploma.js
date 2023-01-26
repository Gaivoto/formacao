const utils = require('../utils/index.js');
const dbDipl = require('../db/diploma.js');

async function getUserDiplomas(tokens, id){
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;

            if(info.user.id == id) {
                dbDipl.getUserDiplomas(id).then(value2 => {
                    info.diplomas = value2;
                    resolve({code: 200, info: info});
                })
                .catch(error => {
                    console.log(error);
                    reject({code: 400, error: { message: "Algo correu mal com a query."}});
                })
            } else {
                reject({code: 403, error: { message: "Um utilizador pode apenas ver os seus diplomas."}});
            }
        })
        .catch(error => {
            console.log(error);
            reject({code: 401, error: { message: "Token inválido."}});
        });
    });
}

module.exports = {
    getUserDiplomas: getUserDiplomas
}