const uuid = require('uuid');
const utils = require('../utils/index.js');
const dbUser = require('../db/user.js');
const dbCour = require('../db/curso.js');
const dbDipl = require('../db/diploma.js');

async function getUser(tokens, id) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;

            if(info.user.id == id) {
                dbUser.getUser(id).then(value2 => {

                    if(value2.length == 0){
                        reject({ code: 404, error: { message: "Este utilizador não existe." }});
                    } else {
                        let profile = value2[0];
                        profile.access_token = info.access_token;
                        let promises = [];
    
                        promises.push(dbCour.getUserCourses(id));
                        promises.push(dbDipl.getUserDiplomas(id));
    
                        Promise.all(promises).then(values => {
                            profile.courses = values[0];
                            profile.diplomas = values[1];
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

async function getAllUsers(tokens) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;
            if (info.user.type == "admin") {
                dbUser.getAllUsers().then(value2 => {
                    info.users = value2;
                    resolve({ code: 200, info: info });
                })
                .catch(error => {
                    console.log(error);
                    reject({ code: 400, error: { message: "Algo correu mal com a query." } });
                })
            } else {
                reject({ code: 403, error: { message: "O user que tentou completar essa ação não é administrador." } });
                reject({ code: 403, error: { message: "O user que tentou completar essa ação não é administrador." } });
            }
        })
        .catch(error => {
            console.log(error);
            reject({ code: 401, error: { message: "Token inválido." } });
        })
    })
}

async function updateUser(tokens, id, user) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;
            if (info.user.id == id) {
                if (user.name == "" || user.image == "" || user.name == null || user.image == null || user.description == null) {
                    reject({ code: 400, error: { message: "A alteração não pode ser feita, porque há valores vazios." }});
                } else {
                    dbUser.updateUser(user, id).then(value => {
                        info.message = "User alterado com sucesso.";
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

                dbUser.getUser(id).then(value2 => {
                    if(value2.length == 0) {
                        reject({ code: 404, error: { message: "Este utilizador não existe." }});
                    } else {
                        if(user.state == "Inativo" || user.state == "Ativo") {
                            dbUser.changeUserState(user.state, id).then(value => {
                                info.message = "Estado alterado com sucesso.";
                                resolve({ code: 200, info: info });
                            })
                            .catch(error => {
                                console.log(error);
                                reject({ code: 400, error: { message: "Algo correu mal com a query." }});
                            });
                        } else {
                            reject({ code: 400, error: { message: "Estado inválido." }});
                        }
                    }
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
        dbUser.isUsernameTaken(user.username).then(async value => {
            if (value.length == 0) {

                dbUser.getAllIDs().then(value2 => {
                    
                    let id;
                    let existe;

                    do {
                        id = uuid.v4();
                        existe = false;
    
                        value2.forEach(i => {
                            if(i.id == id) existe = true;
                        });
                    } while(existe)

                    dbUser.createUser(id, user).then(value => {
                        resolve({ code: 201, info: { message: "User registado com sucesso."} });
                    }).catch(error => {
                        console.log(error);
                        reject({ code: 400, error: { message: "Algo correu mal com a query de insert." }});
                    });
                })
                .catch(error => {
                    console.log(error);
                    reject({ code: 400, error: { message: "Algo correu mal com a query." }});
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
    getAllUsers: getAllUsers,
    getUser: getUser,
    updateUser: updateUser,
    createUser: createUser,
    changeUserState: changeUserState,
}