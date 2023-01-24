const utils = require('../utils/index.js');
const uuid = require('uuid');

const dbCurs = require('../db/curso.js');

async function getCurso(headers, id) {
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
                dbCurs.getCurso(id).then(value2 => {
    
                    if(value2.length <= 0) {
                        reject({ code: 404, error: {message: "Curso não existe." }});
                    } else {
                        let resp = {
                            courses: value2,
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

            dbCurs.getCurso(id).then(value3 => {

                let resp = {
                    courses: value3
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

async function getAllCursos(headers) {
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
                dbCurs.getAllCursos().then(value2 => {
                    
                    let resp = {
                        courses: value2,
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
            dbCurs.getAllCursos().then(value => {
                
                let resp = {
                    courses: value
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

async function createCurso(tokens, body) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value1 => {
            let info = value1;
            let id
            let existe

            dbCurs.isNameTaken(body.name).then(value2 => {

                if(value2.length > 0) {
                    reject({ code: 400, error: {message: "Já existe um curso com este nome." }});
                } else {

                    do {
                        
                        id = uuid.v4();
                        existe = false;

                        dbCurs.isIDTaken(id).then(value3 => {
                            
                            if(value3.length > 0) {
                                existe = true;
                            }

                        })
                        .catch(error => {
                            reject({ code: 400, error: {message: "Algo correu mal com a query." }});
                        });

                    } while(existe)
                    
                    dbCurs.createCurso(id, body).then(value => {
                        resolve({ code: 201, info: info });
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
        .catch(error => {
            console.log(error);
            reject({ code: 401, error: {message: "Token inválido." }})
        });
    });
}

async function updateStateCursoUser(tokens, id, body) {
    return new Promise((resolve, reject) => {
        
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;

            dbCurs.getCurso(id).then(value1 => {
                
                if(value1.length <= 0) {
                    reject({ code: 404, error: {message: "Curso não existe." }});
                } else {

                    dbCurs.isCourseFromUser(id, info.user.id).then(value2 => {

                        if(value2.length <= 0) {
                            reject({ code: 403, error: {message: "Curso não pertence a este user." }});
                        } else {

                            if(body.state === "Ativo" || body.state === "Inativo") {

                                dbCurs.updateStateCursoUser(body).then(value3 => {
                                    resolve({ code: 200, info: info });
                                })
                                .catch(error => {
                                    console.log(error);
                                    reject({ code: 400, error: {message: "Algo correu mal com a query." }});
                                });

                            } else {
                                reject({ code: 401, error: {message: "Current state invalid" }});
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
        .catch(error => {
            console.log(error);
            reject({ code: 401, error: {message: "Token inválido." }})
        });
    });
}

async function updateStateCursoAdm(tokens, id, body) {
    return new Promise((resolve, reject) => {
        
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;

            dbCurs.getCurso(id).then(value1 => {
                
                if(value1.length <= 0) {
                    reject({ code: 404, error: {message: "Curso não existe." }});
                } else {

                    if(info.user.type !== "admin") {
                        reject({ code: 403, error: {message: "Não possui permissão para esta operação." }});
                    } else {

                        if(body.state === "Ativo" || body.state === "Inativo" || body.state === "Pendente" || body.state === "Rejeitado") {

                            dbCurs.updateStateCurso(body).then(value3 => {
                                resolve({ code: 200, info: info });
                            })
                            .catch(error => {
                                console.log(error);
                                reject({ code: 400, error: {message: "Algo correu mal com a query." }});
                            });

                        } else {
                            reject({ code: 401, error: {message: "Current state invalid" }});
                        }   
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

async function updateCurso(tokens, id, body) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;

            dbCurs.getCurso(id).then(value1 => {
                
                if(value1.length <= 0) {
                    reject({ code: 404, error: {message: "Curso não existe." }});
                } else {

                    dbCurs.isCourseFromUser(id, info.user.id).then(value2 => {

                        if(value2.length <= 0) {
                            reject({ code: 403, error: {message: "Curso não pertence a este user." }});
                        } else {

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
                                    console.log(error);
                                    reject({ code: 400, error: {message: "Algo correu mal com a query." }});
                                });
                            } else {
                                reject({ code: 400, error: {message: "Query has empty fields." }});
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
        .catch(error => {
            console.log(error);
            reject({ code: 401, error: {message: "Token inválido." }})
        });
    });
}

module.exports = {
    getCurso: getCurso,
    getAllCursos: getAllCursos,
    createCurso: createCurso,
    updateStateCursoUser: updateStateCursoUser,
    updateStateCursoAdm: updateStateCursoAdm,
    updateCurso: updateCurso,
}