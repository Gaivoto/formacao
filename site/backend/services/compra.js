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
                        reject({ code: 404, error: { message: "noTransaction" } });
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
                    reject({ code: 400, error: { message: "backendQueryError" } });
                });
            })
            .catch(error => {
                console.log(error);
                reject({ code: 401, error: { message: "invalidToken" } })
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
                    reject({ code: 400, error: { message: "backendQueryError" } });
                });
            })
            .catch(error => {
                console.log(error);
                reject({ code: 401, error: { message: "invalidToken" } })
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
                reject({ code: 400, error: { message: "backendQueryError" } });
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
            let data = new Date().toLocaleDateString();
            let dias = data.split('/')[0];
            let mes = data.split('/')[1];
            let ano = data.split('/')[2];
            horas = new Date().getHours();
            minutos = new Date().getMinutes();
            segundos = new Date().getSeconds();
            horario = horas + ':' + minutos + ':' + segundos;
            let currentDate = mes + '-' + dias + '-' + ano + ' ' + horario;
            if (body.id_user !== info.user.id) {
                reject({ code: 403, error: { message: "forbidden" } });
            } else {
                if (info.user.type !== "user" && info.user.type !== "creator") {
                    reject({ code: 403, error: { message: "forbidden" } });
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
                                    reject({ code: 400, error: { message: "userHasCourse" } });
                                } else {
                                    dbSubs.existsSubscricao(body.id_user, id_creator).then(value4 => {
                                        if (value4.length > 0) {
                                            for (let f = 0; f < value4.length; f++) {
                                                if (!value4[f].final_date) {
                                                    existeSubs = true;
                                                }
                                            }
                                            if (existeSubs) {
                                                reject({ code: 400, error: { message: "userHasCourse" } });
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
                                                        reject({ code: 400, error: { message: "backendQueryError" } });
                                                    });
                                                })
                                                .catch(error => {
                                                    console.log(error);
                                                    reject({ code: 400, error: { message: "backendQueryError" } });
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
                                                    reject({ code: 400, error: { message: "backendQueryError" } });
                                                });
                                            })
                                            .catch(error => {
                                                console.log(error);
                                                reject({ code: 400, error: { message: "backendQueryError" } });
                                            });
                                        }
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        reject({ code: 400, error: { message: "backendQueryError" } });
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
                                            reject({ code: 400, error: { message: "userHasCourse" } });
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
                                                    reject({ code: 400, error: { message: "backendQueryError" } });
                                                });
                                            })
                                            .catch(error => {
                                                console.log(error);
                                                reject({ code: 400, error: { message: "backendQueryError" } });
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
                                                reject({ code: 400, error: { message: "backendQueryError" } });
                                            });
                                        })
                                        .catch(error => {
                                            console.log(error);
                                            reject({ code: 400, error: { message: "backendQueryError" } });
                                        });
                                    }
                                })
                                .catch(error => {
                                    console.log(error);
                                    reject({ code: 400, error: { message: "backendQueryError" } });
                                });
                            }
                        })
                        .catch(error => {
                            console.log(error);
                            reject({ code: 400, error: { message: "backendQueryError" } });
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        reject({ code: 400, error: { message: "backendQueryError" } });
                    });
                }
            }
        })
        .catch(error => {
            console.log(error);
            reject({ code: 401, error: { message: "invalidToken" } })
        });
    });
}

module.exports = {
    getCompra: getCompra,
    getAllCompras: getAllCompras,
    createCompra: createCompra,
}