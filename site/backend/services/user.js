const utils = require('../utils/index.js');
const uuid = require('uuid');

const dbUser = require('../db/user.js');

async function createUser(tokens, username, password){
    return new Promise((resolve, reject) => {

        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;

            let id = uuid.v4();

            dbUser.createUser({id: id, username: username, password: password}).then(value => {
                resolve({code: 201, info: info});
            })
            .catch(error => {
                reject({code: 400, message: "Algo correu mal com a query."});
            });
        })
        .catch(error => reject({code: 401, message: "Token inválido."}));;
    });
}

module.exports = {
    createUser: createUser
}