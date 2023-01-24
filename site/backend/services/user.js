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
            //nigga
            dbUser.selectUserById(id).then(value2 => {
                value2.acess_token = info.acess_token;
                dbCour.getUserCourses(id).then(value3 => {
                    value2[0].courses = value3;
                    resolve({ code: 200, info: value2 });
                })
                .catch(error => {
                    console.log(error);
                    reject({ code: 400, error: { message: "Algo correu mal com a query dos cursos." }});
                });
            })
            .catch(error => {
                console.log(error);
                reject({ code: 400, error: { message: "Algo correu mal com a query." }});
            });
        })
        .catch(error => {
            console.log(error);
            reject({ code: 401, error: { message: "Token inválido." }});
        });;
    })
}

async function updateUser(tokens, id, user) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;
            if (info.user.id == id) {
                if (user.name == "" || user.description == "" || user.image == "" || user.price == null) {
                    reject({ code: 400, error: { message: "A alteração não pode ser feita, porque há valores vazios." }});
                }
                else if (user.type != "creator" && user.price != null) {
                    reject({ code: 400, error: { message: "A alteração não pode ser feita, porque tentaste adicionar um preço a um utilizador que não é um criador." }});
                }
                else {
                    dbUser.updateUser(user).then(value => {
                        resolve({ code: 200, info: info });
                    })
                    .catch(error => {
                        console.log(error);
                        reject({ code: 400, error: { message: "Algo correu mal com a query." }});
                    });
                }
            } else {
                reject({ code: 403, error: { message: "A operação não foi possível porquê o user associado ao token não é o mesmo a qual estas a tentar fazer update." }});
            }
        })
        .catch(error => {
            console.log(error);
            reject({ code: 401, error: { message: "Token inválido." }});
        });
    });
}

async function changeUserState(tokens, id, user) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;
            if (info.user.type != 'admin') {

                dbUser.changeUserState(user.state, id).then(value => {
                    resolve({ code: 200, info: info });
                })
                .catch(error => {
                    console.log(error);
                    reject({ code: 400, error: { message: "Algo correu mal com a query." }});
                });
            } else {
                reject({ code: 403, error: { message: "A operação não foi possível porquê o user não é um administrador." }});
            }
        })
        .catch(error => {
            console.log(error);
            reject({ code: 401, error: { message: "Token inválido." }});
        });
    });
}

async function createUser(user) {
    return new Promise((resolve, reject) => {
        dbUser.selectUserByUsername(user.username).then(value => {
            if (value.length == 0) {
                let idGen = uuid.v4();
                dbUser.createUser(idGen, user).then(value => {
                    resolve({ code: 201, info: { message: "User registado com sucesso."} });
                }).catch(error => {
                    console.log(error);
                    reject({ code: 400, error: { message: "Algo correu mal com a query de insert." }});
                });
            } else {
                reject({ code: 400, error: { message: 'Já tem um user com esse username.' }});
            }
        })
        .catch(error => {
            console.log(error);
            reject({ code: 401, error: { message: 'Erro na query.' }});
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
    changeUserState: changeUserState
}