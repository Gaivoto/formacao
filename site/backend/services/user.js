const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const crypto = require('crypto-js');

const utils = require('../utils/index.js');
const dbUser = require('../db/user.js');
const dbAuth = require('../db/auth.js');

async function getUser(tokens, id) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;
            dbUser.getUser(id).then(value => {
                value[0].access_token = info.access_token
                resolve({ code: 200, info: value[0] });
            })
                .catch(error => {
                    reject({ code: 400, message: "Algo correu mal com a query." });
                });
        })
            .catch(error => reject({ code: 401, message: "Token inválido." }));;
    });
}

async function updateUser(tokens, user) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;
            //se um admin nao poder alterar informaçoes comuns de users(digo isso pq depois teremos q alterar o estado de um user para criador), tem q se adicionar aqui uma verificaçao pra ver se a pessoa esta alterando detalhes da sua propria conta, é simples, só compararmos o id do token com o id q recebemos do request
            if (isNaN(Number(user.id))) {
                reject({ code: 404, message: "Id inválido." });
            }
            if (user.name == "" && user.description == "" && user.image == "" && user.price == null) {
                reject({ code: 400, message: "A alteração não pode ser feita, porque todos os valores submetidos estão vazios." });
            }
            else if (user.type != "creator" && user.price != null) {
                reject({ code: 400, message: "A alteração não pode ser feita, porque tentaste adicionar um preço a um utilizador que não é um criador." });
            }
            else {
                dbUser.updateUser(user).then(value => {
                    resolve({ code: 200, info: info });
                }).catch(error => {
                    reject({ code: 400, message: "Algo correu mal com a query." });
                });
            }
        }).catch(error => reject({ code: 401, message: "Token inválido." }))
    });
}

async function createUser(user) {
    return new Promise((resolve, reject) => {
        let idGen = uuid.v4();
        dbUser.createUser(idGen, user).then(value => {
            let userInfo = { id: idGen, username: user.username };
            console.log(userInfo);
            let access_token = jwt.sign(userInfo, process.env.ACCESS_SECRET, { expiresIn: '30m' });
            let refresh_token = jwt.sign(userInfo, process.env.REFRESH_SECRET);
            dbAuth.createToken(crypto.SHA256(refresh_token, process.env.CRYPTO_KEY).toString()).then(value2 => {
                resolve({ code: 201, user: userInfo, access_token: access_token, refresh_token: refresh_token });
                console.log(crypto.SHA256(refresh_token, process.env.CRYPTO_KEY).toString())
            })
                .catch(error => {
                    console.log(error);
                    reject({ code: 400, message: 'Algo correu mal com a query.' });
                });
        }).catch(error => {
            console.log("user8");
            reject({ code: 400, message: "Algo correu mal com a query de insert." });
        });
    })
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
    updateUser: updateUser,
    createUser: createUser,
}