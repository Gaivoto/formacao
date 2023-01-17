const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const crypto = require('crypto-js');
const bcrypt = require('bcrypt');

const utils = require('../utils/index.js');
const dbUser = require('../db/user.js');
const dbAuth = require('../db/auth.js');
const dbCour = require('../db/curso');


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

async function profilePage(tokens, id) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;
            dbUser.selectUserById(id).then(value2 => {
                value2.acess_token = info.acess_token;
                dbCour.getUserCourses(id).then(value3 => {
                    value2[0].courses = value3;
                    resolve({ code: 200, info: value2 });
                }).catch(error => {
                    reject({ code: 400, message: "Algo correu mal com a query dos cursos." });
                });
            }).catch(error => {
                reject({ code: 400, message: "Algo correu mal com a query." });
            });
        }).catch(error => {
            reject({ code: 401, message: "Token inválido." })
        });;
    })
}

async function updateUser(tokens, user) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;
            if (info.user.id == user.id) {
                if (user.id == null) {
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
            } else {
                reject({ code: 400, message: "A operação não foi possível porquê o user associado ao token não é o mesmo a qual estas a tentar fazer update." });
            }
        }).catch(error => reject({ code: 401, message: "Token inválido." }))
    });
}

async function changeUserState(tokens, user) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;
            if (info.user.type != 'admin') {
                if (user.state != 'Inativo' && user.state != 'Ativo') {
                    reject({ code: 400, message: "O estado inserido não é válido." });
                } else {
                    dbUser.changeUserState(user.state, user.id).then(value => {
                        resolve({ code: 200, info: info });
                    }).catch(error => {
                        reject({ code: 400, message: "Algo correu mal com a query." });
                    });
                }
            } else {
                reject({ code: 400, message: "A operação não foi possível porquê o user não é um administrador." });
            }
        }).catch(error => reject({ code: 401, message: "Token inválido." }))
    });
}

async function createUser(user) {
    return new Promise((resolve, reject) => {
        dbUser.selectUserByUsername(user.username).then(async value => {
            if (value.length == 0) {
                let idGen = uuid.v4();
                try {
                    user.password = await bcrypt.hash(user.password, 10)
                    dbUser.createUser(idGen, user).then(value => {
                        let userInfo = { id: idGen, username: user.username, type: user.type };
                        let access_token = jwt.sign(userInfo, process.env.ACCESS_SECRET, { expiresIn: '30m' });
                        let refresh_token = jwt.sign(userInfo, process.env.REFRESH_SECRET);
                        dbAuth.createToken(crypto.SHA256(refresh_token, process.env.CRYPTO_KEY).toString()).then(value2 => {
                            resolve({ code: 201, user: userInfo, access_token: access_token, refresh_token: refresh_token });
                        })
                            .catch(error => {
                                console.log(error);
                                reject({ code: 400, message: 'Algo correu mal com a query.' });
                            });
                    }).catch(error => {
                        reject({ code: 400, message: "Algo correu mal com a query de insert." });
                    });
                } catch {
                    reject({ code: 400, message: "Erro ao encriptar a palavra-passe."})
                }
                
            } else {
                reject({ code: 401, message: 'Já tem um user com esse username.' });
            }
        }).catch(error => {
            reject({ code: 401, message: 'Erro na query.' });
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
    changeUserState: changeUserState,
    profilePage: profilePage
}