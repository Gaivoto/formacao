const uuid = require('uuid');
const utils = require('../utils/index.js');
const dbCria = require('../db/criador.js');
const dbCour = require('../db/curso.js');
const dbUser = require('../db/user.js');
const user = require('../db/user.js');

async function getAllCriadores(tokens) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;
            if (info.user.type == "admin") {
                dbCria.getAllCriadores().then(value2 => {
                    info.admins = value2;
                    resolve({ code: 200, info: info });
                })
                    .catch(error => {
                        console.log(error);
                        reject({ code: 400, error: { message: "Algo correu mal com a query." } });
                    })
            } else {
                reject({ code: 403, error: { message: "O user que tentou completar essa ação não é administrador." } });
            }
        })
            .catch(error => {
                console.log(error);
                reject({ code: 401, error: { message: "Token inválido." } });
            })
    })
}

async function getCriador(headers, id) {
    return new Promise((resolve, reject) => {

        let access_token;
        let refresh_token;

        if (headers['authorization']) {
            access_token = headers['authorization'].split(' ')[1];
            refresh_token = headers.refreshtoken;
        }

        if (access_token && refresh_token) {

            utils.validateToken(access_token, refresh_token).then(value => {

                dbCria.getCriador(id).then(value2 => {
                    if (value2.length == 0) {
                        reject({ code: 404, error: { message: "Este criador não existe." } });
                    } else {
                        dbCour.getCursosByCriador(id).then(value3 => {
                            let resp = {
                                criador: value2[0],
                                access_token: value.access_token
                            }

                            resp.criador.cursos = value3;

                            resolve({ code: 200, info: resp });
                        })
                            .catch(error => {
                                console.log(error);
                                reject({ code: 400, error: { message: "Algo correu mal com a query." } });
                            });
                    }
                })
                    .catch(error => {
                        console.log(error);
                        reject({ code: 400, error: { message: "Algo correu mal com a query." } });
                    });
            })
                .catch(error => {
                    console.log(error);
                    reject({ code: 401, error: { message: "Token inválido." } })
                });

        } else {
            dbCria.getCriador(id).then(value => {
                if (value.length == 0) {
                    reject({ code: 404, error: { message: "Este criador não existe." } });
                } else {
                    dbCour.getCursosByCriador(id).then(value2 => {
                        let criador = value[0];
                        criador.cursos = value2;

                        resolve({ code: 200, info: { criador: value[0] } });
                    })
                        .catch(error => {
                            console.log(error);
                            reject({ code: 400, error: { message: "Algo correu mal com a query." } });
                        });
                }
            })
                .catch(error => {
                    console.log(error);
                    reject({ code: 400, error: { message: "Algo correu mal com a query." } });
                });
        }
    });
}

async function createCriador(tokens, criador) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            if (value.user.type == 'admin') {

                dbUser.isUsernameTaken(criador.username).then(async value2 => {
                    if (value2.length == 0) {

                        dbUser.getAllIDs().then(value3 => {
                            let id;
                            let existe;

                            do {
                                id = uuid.v4();
                                existe = false;

                                value3.forEach(u => {
                                    if (u.id == id) existe = true;
                                });
                            } while (existe)

                            dbCria.createCriador(id, criador).then(value4 => {
                                let info = value;
                                info.message = "Criador criado com sucesso."
                                resolve({ code: 201, info: info });
                            })
                                .catch(error => {
                                    console.log(error);
                                    reject({ code: 400, error: { message: "Algo correu mal com a query de insert." } });
                                });
                        })
                            .catch(error => {
                                console.log(error);
                                reject({ code: 400, error: { message: "Algo correu mal com a query." } });
                            });
                    } else {
                        reject({ code: 400, error: { message: 'Já tem um user com esse username.' } });
                    }
                })
                    .catch(error => {
                        console.log(error);
                        reject({ code: 401, error: { message: 'Erro na query.' } });
                    });

            } else {
                reject({ code: 403, error: { message: "O user que tentou completar essa ação não é administrador." } });
            }
        })
            .catch(error => {
                console.log(error);
                reject({ code: 401, error: { message: "Token inválido." } });
            })
    });
}

async function changeCriadorState(tokens, id, criador) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;
            if (info.user.type == 'admin') {

                dbCria.getCriador(id).then(value2 => {
                    if (value2.length == 0) {
                        reject({ code: 404, error: { message: "Este utilizador não existe." } });
                    } else {
                        if (criador.state == "Inativo" || criador.state == "Ativo") {
                            dbCria.changeCriadorState(criador.state, id).then(value => {
                                info.message = "Estado alterado com sucesso.";
                                resolve({ code: 200, info: info });
                            })
                                .catch(error => {
                                    console.log(error);
                                    reject({ code: 400, error: { message: "Algo correu mal com a query." } });
                                });
                        } else {
                            reject({ code: 400, error: { message: "Estado inválido." } });
                        }
                    }
                })
                    .catch(error => {
                        console.log(error);
                        reject({ code: 400, error: { message: "Algo correu mal com a query." } });
                    });
            } else {
                reject({ code: 403, error: { message: "A operação não foi possível porquê o user não é um administrador." } });
            }
        })
            .catch(error => {
                console.log(error);
                reject({ code: 401, error: { message: "Token inválido." } });
            });
    });
}

async function updateCriador(tokens, id, criador) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;
            if (info.user.id == id) {
                if (criador.name == "" || criador.image == "" || criador.price == "" || criador.name == null || criador.image == null || criador.price == null || criador.description == null || criador.price < 0) {
                    reject({ code: 400, error: { message: "A alteração não pode ser feita, porque há valores vazios/inválidos." } });
                } else {
                    dbCria.updateCriador(criador, id).then(value => {
                        info.message = "Criador alterado com sucesso.";
                        resolve({ code: 200, info: info });
                    })
                        .catch(error => {
                            console.log(error);
                            reject({ code: 400, error: { message: "Algo correu mal com a query." } });
                        });
                }
            } else {
                reject({ code: 403, error: { message: "A operação não foi possível porquê o user associado ao token não é o mesmo a qual estas a tentar fazer update." } });
            }
        })
            .catch(error => {
                console.log(error);
                reject({ code: 401, error: { message: "Token inválido." } });
            });
    });
}

async function getCriadoresHomepage() {
    return new Promise((resolve, reject) => {

        let promises = []
        let creators = []

        promises.push(dbCria.getPointsCompra())
        promises.push(dbCria.getPointsSubs())

        Promise.all(promises).then(values => {

            creators = values[0]

            values[1].forEach(val => {
                creators.forEach(c => {
                    if (c.id === val.id) {
                        c.points += val.points
                    }
                })
            })

            creators.sort((a, b) => (a.points < b.points) ? 1 : ((b.points < a.points) ? -1 : 0))

            creators = creators.slice(0, 10);

            resolve({ code: 200, info: creators });

        }).catch(error => {
            console.log(error);
            reject({ code: 400, error: { message: "Algo correu mal com a query." } });
        });



    });
}

module.exports = {
    getAllCriadores: getAllCriadores,
    getCriador: getCriador,
    createCriador: createCriador,
    updateCriador: updateCriador,
    changeCriadorState: changeCriadorState,
    getCriadoresHomepage: getCriadoresHomepage,
}