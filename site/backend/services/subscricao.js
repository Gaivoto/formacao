const utils = require('../utils/index.js');
const uuid = require('uuid');

const dbSubs = require('../db/subscricao.js');
const dbUser = require('../db/user.js');
const dbCurs = require('../db/curso.js');
const dbComp = require('../db/compra.js');

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

                        if(value3[0].type !== "creator") {
                            reject({ code: 400, error: {message: "Utilizador não é criador." }});
                        } else {

                            dbSubs.getAllSubscricoes().then(value4 => {
                                
                                do {
                                    idSub = uuid.v4();
                                    existe = false;
                
                                    value4.forEach(u => {
                                        if(u.id == idSub) existe = true;
                                    });
                                } while(existe)
                                
                                let data = new Date().toLocaleDateString();
                                let dias = data.split('/')[0];
                                let mes = data.split('/')[1];
                                let ano = data.split('/')[2];
                                horas = new Date().getHours();
                                minutos = new Date().getMinutes();
                                segundos = new Date().getSeconds();
                                horario = horas + ':' + minutos + ':' + segundos;
                                let dataAtual = mes + '-' + dias + '-' + ano + ' ' + horario;
                                body.start_date = dataAtual;
                                dbSubs.createSubscricao(idSub, body).then(value5 => {
                                    
                                    dbCurs.getCursosByCriador(body.id_subscribed).then(value6 =>{
                                        let promisesCompra = [];
                                        for(let i = 0; i < value6.length; i++ ) {
                                            let idCompra = uuid.v4();
                                            let compraObj = {};
                                            compraObj.id_user = body.id_subscriber;
                                            compraObj.id_course = value6[i].id;
                                            compraObj.id_subscription = idSub;
                                            promisesCompra.push(dbComp.createCompra(idCompra, compraObj, dataAtual))
                                        }
                                        Promise.all(promisesCompra).then(values => {
                                            resolve({ code: 201, info: info });
                                        })
                                        .catch(error => {
                                            console.log(error);
                                            reject({ code: 400, error: {message: "Algo correu mal com as promises das compras após subscription." }});
                                        })
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        reject({ code: 400, error: {message: "Algo correu mal com a query de buscar cursos do criador." }});
                                    })
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

async function endSubscricao(tokens, id) {
    return new Promise((resolve, reject) => {
        
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;

            dbSubs.getSubscricao(id).then(value1 => {
                
                if(value1.length <= 0) {
                    reject({ code: 404, error: {message: "Subscrição não existe." }});
                } else {

                    if(value1[0].id_subscriber !== info.user.id) {
                        
                        reject({ code: 403, error: {message: "Curso não pertence a este user." }});
                    } else {

                        let data = new Date().toLocaleDateString();
                        let dias = data.split('/')[0];
                        let mes = data.split('/')[1];
                        let ano = data.split('/')[2];
                        horas = new Date().getHours();
                        minutos = new Date().getMinutes();
                        segundos = new Date().getSeconds();
                        horario = horas + ':' + minutos + ':' + segundos;
                        let dataAtual = mes + '-' + dias + '-' + ano + ' ' + horario;

                        dbSubs.endSubscricao(dataAtual, id).then(value3 => {
                            dbComp.endCompraAfterSubscriptionEnded(id, dataAtual).then(value4 => {
                                info.message = "Estado alterado com sucesso.";
                                resolve({ code: 200, info: info });
                            })
                            .catch(error => {
                                console.log(error);
                                reject({ code: 400, error: {message: "Algo correu mal com a query." }});
                            })
                        })
                        .catch(error => {
                            console.log(error);
                            reject({ code: 400, error: {message: "Algo correu mal com a query." }});
                        });
                } 

                }
            })
            .catch(error => {
                console.log(error);
                reject({ code: 400, error: {message: "Algo correu mal com a query." }});
            });
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
    endSubscricao: endSubscricao,
}