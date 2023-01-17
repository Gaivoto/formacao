const utils = require('../utils/index.js');
const uuid = require('uuid');

const dbCurs = require('../db/curso.js');

async function getCurso(tokens, id) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;
            dbCurs.getCurso(id).then(value => {

                let resp = {
                    courses: value,
                    access_token: info.access_token
                }

                resolve({ code: 200, info: resp });
            })
            .catch(error => {
                reject({ code: 400, error: {message: "Algo correu mal com a query."}});
            });
        })
        .catch(error => reject({ code: 401, error: {message: "Token inválido."}}));
    });
}

async function getAllCursos(headers) {
    return new Promise((resolve, reject) => {

        let access_token
        let refresh_token

        if(headers['authorization']) {
            access_token = headers['authorization'].split(' ')[1];
            refresh_token = headers.refreshtoken;
        }

        if(access_token && refresh_token) {
            utils.validateToken(access_token, refresh_token).then(value => {
                let info = value;
                dbCurs.getAllCursos().then(value2 => {
                    
                    let resp = {
                        courses: value2,
                        access_token: info.access_token
                    }
                    resolve({ code: 200, info: resp });
                })
                .catch(error => {
                    reject({ code: 400, error: {message: "Algo correu mal com a query."}});
                });
            })
            .catch(error => reject({ code: 401, error: {message: "Token inválido."}}));

        } else {
            dbCurs.getAllCursos().then(value => {
                let resp = {
                    courses: value
                }
                resolve({ code: 200, info: resp });
            })
            .catch(error => {
                reject({ code: 400, error: {message: "Algo correu mal com a query."}});
            });
        }

    });
}

async function createCurso(tokens, body) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value1 => {
            let info = value1;
            let id
            let existe

            dbCurs.isNameTaken(body.name).then(value2 => {

                if(value2.length > 0) {
                    reject({ code: 403, error: {message: "Esse nome já está a ser utilizado." }});
                } else {

                    do {
                        
                        id = uuid.v4();
                        existe = false;

                        dbCurs.isIDTaken(id).then(value3 => {
                            
                            if(value3.length >= 0) {
                                existe = true;
                            }

                        })
                        .catch(error => {
                            reject({ code: 400, error: {message: "Algo correu mal com a query." }});
                        });

                    } while(existe === true)
                    
                    dbCurs.createCurso(id, body).then(value => {
                        resolve({ code: 200, info: info });
                    })
                    .catch(error => {
                        reject({ code: 400, error: {message: "Algo correu mal com a query." }});
                    });

                }
            })
            .catch(error => {
                console.log(error);
                reject({ code: 400, error: {message: "Algo correu mal com a query." }});
            });

        })
        .catch(error => reject({ code: 401, error: {message: "Token inválido." }}));;
    });
}

async function removeCurso(tokens, body) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;

            dbCurs.getCurso(body.id).then(value1 => {
                
                if(value1.length <= 0) {
                    reject({ code: 404, error: {message: "Curso não existe." }});
                } else {

                    dbCurs.isCourseFromUser(body.id, info.user.id).then(value2 => {

                        if(value2.length <= 0) {
                            reject({ code: 403, error: {message: "Curso não pertence a este user." }});
                        } else {

                            if(body.state === "Ativo" || body.state === "Inativo" || body.state === "Pendente") {

                                dbCurs.removeCurso(body).then(value3 => {

                                    resolve({ code: 200, info: info });
                                })
                                .catch(error => {
                                    console.log(error);
                                    reject({ code: 400, error: {message: "Algo correu mal com a query." }});
                                });

                            } else {

                                reject({ code: 401, error: {message: "Current state invalid" }})

                            }
                        } 
                    })
                    .catch(error => {
                        console.log(error);
                        reject({ code: 400, error: {message: "Algo correu mal com a query." }});
                    });
                }
            })
            .catch(error => {
                console.log(error);
                reject({ code: 400, error: {message: "Algo correu mal com a query." }});
            });
        })
        .catch(error => reject({ code: 401, error: {message: "Token inválido." }}));;
    });
}

async function updateCurso(tokens, body) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;

            dbCurs.getCurso(body.id).then(value1 => {
                
                if(value1.length <= 0) {
                    reject({ code: 404, error: {message: "Curso não existe." }});
                } else {

                    dbCurs.isCourseFromUser(body.id, info.user.id).then(value2 => {

                        if(value2.length <= 0) {
                            reject({ code: 403, error: {message: "Curso não pertence a este user." }});
                        } else {

                            let id = body.id;
                            let name = body.name;
                            let category = body.category;
                            let description = body.description;
                            let price = body.price;
                            let image = body.image;

                            if(id !== null || name !== null || category !== null || description !== null || price !== null || image !== null) {
                                
                                dbCurs.updateCurso(body).then(value3 => {
                                    resolve({ code: 200, info: info });
                                })
                                .catch(error => {
                                    reject({ code: 400, error: {message: "Algo correu mal com a query." }});
                                });

                            } else {
                                reject({ code: 401, error: {message: "Query has empty fields" }})
                            }

                        } 
                    })
                    .catch(error => {
                        console.log(error);
                        reject({ code: 400, error: {message: "Algo correu mal com a query." }});
                    });
                }
            })
            .catch(error => {
                console.log(error);
                reject({ code: 400, error: {message: "Algo correu mal com a query." }});
            });

        })
        .catch(error => reject({ code: 401, error: {message: "Token inválido." }}));;
    });
}



module.exports = {
    getCurso: getCurso,
    getAllCursos: getAllCursos,
    createCurso: createCurso,
    removeCurso: removeCurso,
    updateCurso: updateCurso,
}