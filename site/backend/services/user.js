const utils = require('../utils/index.js');
const uuid = require('uuid');

const dbUser = require('../db/user.js');

async function getUser(tokens, id) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;
            dbUser.getUser(id).then(value => {
                resolve({ code: 201, info: info });
            })
                .catch(error => {
                    reject({ code: 400, message: "Algo correu mal com a query." });
                });
        })
            .catch(error => reject({ code: 401, message: "Token inválido." }));;
    });
}

/*async function createUser(tokens, body){
    return new Promise((resolve, reject) => {

        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;

            let id = uuid.v4();

            dbUser.createUser({id: id, username: body.username, name: body.name, password: body.password, type: body.type, email: body.email, image: body.image, description: body.description, country: body.country, price: body.price, state: body.state}).then(value => {
                resolve({code: 201, info: info});
            })
            .catch(error => {
                reject({code: 400, message: "Algo correu mal com a query."});
            });
        })
        .catch(error => reject({code: 401, message: "Token inválido."}));;
    });
}*/

module.exports = {
    //createUser: createUser,
    getUser: getUser,
}