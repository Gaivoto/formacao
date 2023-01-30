const utils = require('../utils/index.js');
const uuid = require('uuid');

const dbCurs = require('../db/curso.js');
const dbUser = require('../db/user.js');
const dbVide = require('../db/video.js');
const dbNotif = require('../db/notification.js');

async function getCurso(headers, id) {
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
                dbCurs.getCurso(id).then(value2 => {

                    if (value2.length == 0) {
                        reject({ code: 404, error: { message: "Curso não existe." } });
                    } else {

                        info.course = value2[0];

                        dbSubs.existsSubscricao(info.user.id, value2[0].id_creator).then(value3 => {

                            if (value3.length <= 0) {
                                reject({ code: 404, error: { message: "Subscricao não existe." } });
                            } else {

                                dbVide.getAllVideosFromCourse(id).then(value4 => {
                                    info.course.videos = value4;
                                    resolve({ code: 200, info: info });
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
                    reject({ code: 401, error: { message: "Token inválido." } })
                });

        } else {

            dbCurs.getCurso(id).then(value => {
                if (value.length == 0) {
                    reject({ code: 404, error: { message: "Curso não existe." } });
                } else {
                    let resp = {
                        course: value[0]
                    }

                    dbVide.getAllVideosFromCourse(id).then(value2 => {
                        resp.course.videos = value2;
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
        }
    });
}

async function getAllCursos(headers) {
    return new Promise((resolve, reject) => {

        let access_token;
        let refresh_token;
        let promises = [];

        if (headers['authorization']) {
            access_token = headers['authorization'].split(' ')[1];
            refresh_token = headers.refreshtoken;
        }

        if (access_token && refresh_token) {
            utils.validateToken(access_token, refresh_token).then(value => {
                let info = value;
                dbCurs.getAllCursos().then(value2 => {
                    info.courses = value2;

                    info.courses.forEach(cou => {
                        promises.push(dbVide.getAllVideosFromCourse(cou.id));
                    });

                    Promise.all(promises).then(values => {
                        for (let i = 0; i < info.courses.length; i++) {
                            info.courses[i].videos = values[i];
                        }

                        resolve({ code: 200, info: info });
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
            })
                .catch(error => {
                    console.log(error);
                    reject({ code: 401, error: { message: "Token inválido." } })
                });

        } else {
            dbCurs.getAllCursos().then(value => {

                let resp = {
                    courses: value
                }

                resp.courses.forEach(cou => {
                    promises.push(dbVide.getAllVideosFromCourse(cou.id));
                });

                Promise.all(promises).then(values => {
                    for (let i = 0; i < resp.courses.length; i++) {
                        resp.courses[i].videos = values[i];
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
                    reject({ code: 400, error: { message: "Algo correu mal com a query." } });
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

                if (value2.length > 0) {
                    reject({ code: 400, error: { message: "Já existe um curso com este nome." } });
                } else {

                    dbUser.getAllUsers().then(value3 => {

                        do {
                            id = uuid.v4();
                            existe = false;

                            value3.forEach(u => {
                                if (u.id == id) existe = true;
                            });
                        } while (existe)

                        dbCurs.createCurso(id, body).then(value => {
                            info.message = "Curso criado com sucesso.";
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
        })
            .catch(error => {
                console.log(error);
                reject({ code: 401, error: { message: "Token inválido." } })
            });
    });
}

async function updateStateCursoUser(tokens, id, body) {
    return new Promise((resolve, reject) => {

        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;

            dbCurs.getCurso(id).then(value1 => {

                if (value1.length <= 0) {
                    reject({ code: 404, error: { message: "Curso não existe." } });
                } else {

                    dbCurs.isCourseFromUser(id, info.user.id).then(value2 => {

                        if (value2.length <= 0) {
                            reject({ code: 403, error: { message: "Curso não pertence a este user." } });
                        } else {

                            if (body.state === "Ativo" || body.state === "Inativo") {

                                dbCurs.updateStateCursoUser(body).then(value3 => {
                                    info.message = "Estado alterado com sucesso.";
                                    resolve({ code: 200, info: info });
                                })
                                    .catch(error => {
                                        console.log(error);
                                        reject({ code: 400, error: { message: "Algo correu mal com a query." } });
                                    });

                            } else {
                                reject({ code: 401, error: { message: "Current state invalid" } });
                            }
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
                reject({ code: 401, error: { message: "Token inválido." } })
            });
    });
}

async function updateStateCursoAdm(tokens, id, body) {
    return new Promise((resolve, reject) => {

        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;

            dbCurs.getCurso(id).then(value1 => {

                if (value1.length <= 0) {
                    reject({ code: 404, error: { message: "Curso não existe." } });
                } else {

                    if (info.user.type !== "admin") {
                        reject({ code: 403, error: { message: "Não possui permissão para esta operação." } });
                    } else {

                        if (body.state === "Ativo" || body.state === "Inativo" || body.state === "Pendente" || body.state === "Rejeitado") {

                            dbCurs.updateStateCurso(body).then(value3 => {
                                //ainda falta dar uma olhadinha em verificacoes aqui, por exemplo quando uma pessoa se inscreveu em um curso mas ja acabou a subscricao ele nao deve mais receber notificacoes, isso vai ser feito aqui mesmo
                                //aqui vai entrar a notificaçao pro dono do curso e se for tornado ativo as pessoas que seguem aquele criador tambem vao receber aquele curso, isso preciso esperar o andre fazer a funçao
                                let notif = {}
                                notif.id = uuid.v4();
                                notif.message = 'O estado do curso ' + value1[0].name + ' foi alterado para ' + body.state + '.';

                                data = new Date().toLocaleDateString();
                                dias = data.split('/')[0];
                                mes = data.split('/')[1];
                                ano = data.split('/')[2];
                                notif.date = mes + '-' + dias + '-' + ano

                                notif.id_user = value1[0].id_creator;
                                notif.id_course = id;
                                notif.id_video = null;
                                dbNotif.createNotification(notif).then(value4 => {
                                    info.message = "Estado alterado com sucesso.";
                                    resolve({ code: 200, info: info });
                                })
                                    .catch(error => {
                                        console.log(error);
                                        reject({ code: 400, error: { message: "Erro ao executar a query da notificação." } })
                                    })
                            })
                                .catch(error => {
                                    console.log(error);
                                    reject({ code: 400, error: { message: "Algo correu mal com a query." } });
                                });

                        } else {
                            reject({ code: 401, error: { message: "Current state invalid" } });
                        }
                    }
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
    });
}

async function updateCurso(tokens, id, body) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;

            dbCurs.getCurso(id).then(value1 => {

                if (value1.length <= 0) {
                    reject({ code: 404, error: { message: "Curso não existe." } });
                } else {

                    dbCurs.isCourseFromUser(id, info.user.id).then(value2 => {

                        if (value2.length <= 0) {
                            reject({ code: 403, error: { message: "Curso não pertence a este user." } });
                        } else {

                            let name = body.name;
                            let category = body.category;
                            let description = body.description;
                            let price = body.price;
                            let image = body.image;

                            if (id !== null || name !== null || category !== null || description !== null || price !== null || image !== null) {

                                dbCurs.updateCurso(body).then(value3 => {
                                    info.message = "Curso alterado com sucesso.";
                                    resolve({ code: 200, info: info });
                                })
                                    .catch(error => {
                                        console.log(error);
                                        reject({ code: 400, error: { message: "Algo correu mal com a query." } });
                                    });
                            } else {
                                reject({ code: 400, error: { message: "Query has empty fields." } });
                            }
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
                reject({ code: 401, error: { message: "Token inválido." } })
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