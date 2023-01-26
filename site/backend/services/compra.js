const utils = require('../utils/index.js');
const uuid = require('uuid');

const dbComp = require('../db/compra.js');
const dbUser = require('../db/user.js');
const dbCurs = require('../db/curso.js');
const dbSubs = require('../db/subscricao.js');

async function getCompra(headers, id) {
    return new Promise((resolve, reject) => {

        let access_token;
        let refresh_token;

        if (headers['authorization']) {
            access_token = headers['authorization'].split(' ')[1];
            refresh_token = headers.refreshtoken;
        }

        if (access_token && refresh_token) {

            utils.validateToken(access_token, refresh_token).then(value1 => {

                let info = value1;
                dbComp.getCompra(id).then(value2 => {

                    if (value2.length <= 0) {
                        reject({ code: 404, error: { message: "Compra não existe." } });
                    } else {
                        let resp = {
                            comp: value2,
                            access_token: info.access_token
                        }
                        resolve({ code: 200, info: resp });
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

        }
    });
}

async function getAllCompras(headers) {
    return new Promise((resolve, reject) => {

        let access_token;
        let refresh_token;

        if (headers['authorization']) {
            access_token = headers['authorization'].split(' ')[1];
            refresh_token = headers.refreshtoken;
        }

        if (access_token && refresh_token) {
            utils.validateToken(access_token, refresh_token).then(value => {
                let info = value;
                dbComp.getAllCompras().then(value2 => {

                    let resp = {
                        comp: value2,
                        access_token: info.access_token
                    }

                    resolve({ code: 200, info: resp });
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
            dbComp.getAllCompras().then(value => {

                let resp = {
                    comp: value
                }

                resolve({ code: 200, info: resp });
            })
                .catch(error => {
                    console.log(error);
                    reject({ code: 400, error: { message: "Algo correu mal com a query." } });
                });
        }

    });
}

async function createCompra(tokens, body) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value1 => {
            let info = value1;
            let id
            let existeID
            let existeCompra = false
            let existeSubs = false
            let currentDate = new Date().toLocaleDateString();
            let dias = currentDate.split('/')[0];
            let mes = currentDate.split('/')[1];
            let ano = currentDate.split('/')[2];
            currentDate = mes + '-' + dias + '-' + ano
            if (body.id_user !== info.user.id) {
                reject({ code: 400, error: { message: "Não pode comprar subscrições a outros utilizadores." } });
            } else {
                if (info.user.type !== "user" && info.user.type !== "creator") {
                    reject({ code: 400, error: { message: "Admins não fazem compras." } });
                } else {
                    dbCurs.getCurso(body.id_course).then(value2 => {
                        let id_creator = value2[0].id_creator;
                        dbComp.existsCompra(body.id_user, body.id_course).then(value3 => {
                            if (value3.length > 0) {
                                let sixmonthsago = new Date()
                                sixmonthsago.setMonth(sixmonthsago.getMonth() - 6);
                                for (let i = 0; i < value3.length; i++) {
                                    if (value3[i].date_bought >= sixmonthsago) {
                                        existeCompra = true;
                                    }
                                }
                                if (existeCompra) {
                                    reject({ code: 400, error: { message: "User já possui este curso." } });
                                } else {
                                    dbSubs.existsSubscricao(body.id_user, id_creator).then(value4 => {
                                        if (value4.length > 0) {
                                            for (let f = 0; f < value4.length; f++) {
                                                if (!value4[f].final_date) {
                                                    existeSubs = true;
                                                }
                                            }
                                            if (existeSubs) {
                                                reject({ code: 400, error: { message: "User encontra-se subscrito." } });
                                            } else {
                                                dbComp.getAllCompras().then(value5 => {
                                                    do {
                                                        id = uuid.v4();
                                                        existeID = false;
                                                        value5.forEach(u => {
                                                            if (u.id == id) existeID = true;
                                                        });
                                                    } while (existeID)
                                                    dbComp.createCompra(id, body, currentDate).then(value => {
                                                        resolve({ code: 201, info: info });
                                                    })
                                                        .catch(error => {
                                                            console.log(error);
                                                            reject({ code: 400, error: { message: "Algo correu mal com a query." } });
                                                        });
                                                })
                                                    .catch(error => {
                                                        console.log(error);
                                                        reject({ code: 400, error: { message: "Algo correu mal com a query." } });
                                                    });
                                            }
                                        } else {
                                            dbComp.getAllCompras().then(value5 => {
                                                do {
                                                    id = uuid.v4();
                                                    existeID = false;

                                                    value5.forEach(u => {
                                                        if (u.id == id) existeID = true;
                                                    });
                                                } while (existeID)
                                                dbComp.createCompra(id, body, currentDate).then(value => {
                                                    resolve({ code: 201, info: info });
                                                })
                                                    .catch(error => {
                                                        console.log(error);
                                                        reject({ code: 400, error: { message: "Algo correu mal com a query." } });
                                                    });
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
                            } else {
                                dbSubs.existsSubscricao(body.id_user, id_creator).then(value4 => {
                                    if (value4.length > 0) {
                                        for (let f = 0; f < value4.length; f++) {
                                            if (!value4[f].final_date) {
                                                existeSubs = true;
                                            }
                                        }
                                        if (existeSubs) {
                                            reject({ code: 400, error: { message: "User encontra-se subscrito." } });
                                        } else {
                                            dbComp.getAllCompras().then(value5 => {
                                                do {
                                                    id = uuid.v4();
                                                    existeID = false;
                                                    value5.forEach(u => {
                                                        if (u.id == id) existeID = true;
                                                    });
                                                } while (existeID)

                                                dbComp.createCompra(id, body, currentDate).then(value => {
                                                    resolve({ code: 201, info: info });
                                                })
                                                    .catch(error => {
                                                        console.log(error);
                                                        reject({ code: 400, error: { message: "Algo correu mal com a query." } });
                                                    });
                                            })
                                                .catch(error => {
                                                    console.log(error);
                                                    reject({ code: 400, error: { message: "Algo correu mal com a query." } });
                                                });
                                        }
                                    } else {
                                        dbComp.getAllCompras().then(value5 => {
                                            do {
                                                id = uuid.v4();
                                                existeID = false;
                                                value5.forEach(u => {
                                                    if (u.id == id) existeID = true;
                                                });
                                            } while (existeID)
                                            dbComp.createCompra(id, body, currentDate).then(value => {
                                                resolve({ code: 201, info: info });
                                            })
                                                .catch(error => {
                                                    console.log(error);
                                                    reject({ code: 400, error: { message: "Algo correu mal com a query." } });
                                                });
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
                        })
                            .catch(error => {
                                console.log(error);
                                reject({ code: 400, error: { message: "Algo correu mal com a query." } });
                            });
                    })
                        .catch(error => {
                            console.log(error);
                            reject({ code: 400, error: { message: "Algo correu mal com a query." } });
                        });
                }
            }
        })
            .catch(error => {
                console.log(error);
                reject({ code: 401, error: { message: "Token inválido." } })
            });
    });
}

module.exports = {
    getCompra: getCompra,
    getAllCompras: getAllCompras,
    createCompra: createCompra,
}