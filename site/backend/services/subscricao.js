const utils = require('../utils/index.js');
const uuid = require('uuid');

const dbSubs = require('../db/subscricao.js');
const dbUser = require('../db/user.js');

async function getSubscricao(headers, id) {
    return new Promise((resolve, reject) => {
        
        let access_token;
        let refresh_token;

        if(headers['authorization']) {
            access_token = headers['authorization'].split(' ')[1];
            refresh_token = headers.refreshtoken;
        }

        if(access_token && refresh_token) {

            utils.validateToken(access_token, refresh_token).then(value1 => {

                let info = value1;
                dbSubs.getSubscricao(id).then(value2 => {
    
                    if(value2.length <= 0) {
                        reject({ code: 404, error: {message: "Subscrição não existe." }});
                    } else {
                        let resp = {
                            subs: value2,
                            access_token: info.access_token
                        }
                        resolve({ code: 200, info: resp });
                    }
                })
                .catch(error => {
                    console.log(error);
                    reject({ code: 400, error: {message: "Algo correu mal com a query."}});
                });
            })
            .catch(error => {
                console.log(error);
                reject({ code: 401, error: {message: "Token inválido."}})
            });

        } else {

            dbSubs.getSubscricao(id).then(value3 => {

                if(value3.length <= 0) {
                    reject({ code: 404, error: {message: "Subscrição não existe." }});
                } else {
                    let resp = {
                        subs: value3
                    }
                    resolve({ code: 200, info: resp });
                }
            })
            .catch(error => {
                console.log(error);
                reject({ code: 400, error: {message: "Algo correu mal com a query."}});
            });
        } 
    });
}

async function getAllSubscricoes(headers) {
    return new Promise((resolve, reject) => {

        let access_token;
        let refresh_token;

        if(headers['authorization']) {
            access_token = headers['authorization'].split(' ')[1];
            refresh_token = headers.refreshtoken;
        }

        if(access_token && refresh_token) {
            utils.validateToken(access_token, refresh_token).then(value => {
                let info = value;
                dbSubs.getAllSubscricoes().then(value2 => {
                    
                    let resp = {
                        subs: value2,
                        access_token: info.access_token
                    }

                    resolve({ code: 200, info: resp });
                })
                .catch(error => {
                    console.log(error);
                    reject({ code: 400, error: {message: "Algo correu mal com a query."}});
                });
            })
            .catch(error => {
                console.log(error);
                reject({ code: 401, error: {message: "Token inválido."}})
            });

        } else {
            dbSubs.getAllSubscricoes().then(value => {
                
                let resp = {
                    subs: value
                }

                resolve({ code: 200, info: resp });
            })
            .catch(error => {
                console.log(error);
                reject({ code: 400, error: {message: "Algo correu mal com a query."}});
            });
        }

    });
}

async function createSubscricao(tokens, body) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value1 => {
            let info = value1;
            let id
            let existe

            if(body.id_subscriber !== info.user.id) {
                reject({ code: 400, error: {message: "Não pode subscrever outros utilizadores." }});
            } else {

                dbUser.getUser(body.id_subscribed).then(value3 => {

                    if(value3.length <= 0) {
                        reject({ code: 400, error: {message: "Criador não encontrado." }});
                    } else {

                        dbSubs.getAllSubscricoes().then(value4 => {
        
                            do {
                                id = uuid.v4();
                                existe = false;
            
                                value4.forEach(u => {
                                    if(u.id == id) existe = true;
                                });
                            } while(existe)
        
                            dbSubs.createSubscricao(id, body).then(value => {
                                resolve({ code: 201, info: info });
                            })
                            .catch(error => {
                                console.log(error);
                                reject({ code: 400, error: {message: "Algo correu mal com a query." }});
                            });
                        })
                        .catch(error => {
                            console.log(error);
                            reject({ code: 400, error: { message: "Algo correu mal com a query." }});
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                    reject({ code: 400, error: { message: "Algo correu mal com a query." }});
                });
            }
            
        })
        .catch(error => {
            console.log(error);
            reject({ code: 401, error: {message: "Token inválido." }})
        });
    });
}

module.exports = {
    getSubscricao: getSubscricao,
    getAllSubscricoes: getAllSubscricoes,
    createSubscricao: createSubscricao,
}