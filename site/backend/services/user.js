const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const crypto = require('crypto-js');

const utils = require('../utils/index.js');
const dbUser = require('../db/user.js');
const dbAuth = require('../db/auth.js');
const dbCour = require('../db/curso.js');

async function getUser(tokens, id) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;

            if(info.user.id == id) {
                dbUser.selectUserById(id).then(value2 => {

                    if(value2.length == 0){
                        reject({ code: 404, error: { message: "Este utilizador não existe." }});
                    } else {
                        let profile = value2[0];
                        profile.access_token = info.access_token;
                        let promises = [];
    
                        promises.push(dbCour.getUserCourses(id));
                        //promises.push(dbCour.getUserDiplomas(id));
    
                        Promise.all(promises).then(values => {
                            profile.courses = values[0];
                            //profile.diplomas = values[0];
                            resolve({ code: 200, info: profile });
                        })
                        .catch(error => {
                            console.log(error);
                            reject({ code: 400, error: { message: "Algo correu mal com a query dos cursos." }});
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                    reject({ code: 400, error: { message: "Algo correu mal com a query." }});
                });

            } else {
                reject({ code: 403, error: { message: "Um user só pode ver o seu próprio perfil." }});
            }
        })
        .catch(error => {
            console.log(error);
            reject({ code: 401, error: { message: "Token inválido." }});
        });
    });
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
            if (info.user.type == 'admin') {

                if(user.state == "Inativo" || user.state == "Ativo") {
                    dbUser.changeUserState(user.state, id).then(value => {
                        resolve({ code: 200, info: info });
                    })
                    .catch(error => {
                        console.log(error);
                        reject({ code: 400, error: { message: "Algo correu mal com a query." }});
                    });
                } else {
                    reject({ code: 400, error: { message: "Estado inválido." }});
                }
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

module.exports = {
    getUser: getUser,
    updateUser: updateUser,
    createUser: createUser,
    changeUserState: changeUserState
}