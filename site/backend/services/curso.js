const utils = require('../utils/index.js');
const uuid = require('uuid');

const dbCurs = require('../db/curso.js');
const dbUser = require('../db/user.js');
const dbVide = require('../db/video.js');
const dbNotif = require('../db/notification.js');
const dbSubs = require('../db/subscricao')
const dbComp = require('../db/compra.js');

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
                        reject({ code: 404, error: { message: "noCourse" } });
                    } else {

                        info.course = value2[0];
                        info.course.access = false;
                        let promises = [];


                        promises.push(dbComp.existsCompra(info.user.id, id))
                        promises.push(dbVide.getAllVideosFromCourse(id))
                        promises.push(dbCurs.getUserRatingOfCourse(info.user.id, id))
                        Promise.all(promises).then(values => {
                            let duration = 0;
                            let durationInt = 0;
                            for (let i = 0; i < values[1].length; i++) {
                                durationInt = parseInt(values[1][i].duration)
                                duration = duration + durationInt;
                            }
                            info.course.userRating = null;
                            if(values[2].length > 0) {
                                info.course.userRating = values[2][0].rating
                            }
                            if(values[0].length > 0) {
                                let sixmonthsago = new Date();
                                sixmonthsago.setMonth(sixmonthsago.getMonth() - 6);
                                values[0].forEach(sub => {
                                    if(sub.id_subscription == null) {
                                        if(sub.date_bought >= sixmonthsago) {
                                            info.course.access = true;
                                        }
                                    } else {
                                        if(sub.data_sub == null) {
                                            info.course.access = true;
                                        }
                                    }
                                })
                            }
                            
                            info.course.duration = duration/3600;
                            info.course.videos = values[1];
                            if(value1.user.type == "admin") {
                                info.course.access = true;
                            }
                            resolve({ code: 200, info: info });

                        }).catch(error => {
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
                reject({ code: 401, error: { message: "invalidToken" } })
            });

        } else {

            dbCurs.getCurso(id).then(value => {
                if (value.length == 0) {
                    reject({ code: 404, error: { message: "noCourse" } });
                } else {
                    let resp = {
                        course: value[0]
                    }

                    dbVide.getAllVideosFromCourse(id).then(value2 => {
                        let duration = 0;
                        let durationInt = 0;
                        for (let i = 0; i < value2.length; i++) {
                            durationInt = parseInt(value2[i].duration)
                            duration = duration + durationInt;
                        }
                        resp.course.duration = duration / 3600;
                        resp.course.videos = value2;
                        resolve({ code: 200, info: resp });
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

                if (info.user.type == 'admin') {
                    dbCurs.getAllCursosAdm().then(value2 => {

                        info.courses = value2;

                        info.courses.forEach(cou => {

                            promises.push(dbVide.getAllVideosFromCourse(cou.id));
                        });

                        Promise.all(promises).then(values => {
                            for (let i = 0; i < info.courses.length; i++) {
                                let duration = 0;
                                let durationInt = 0;
                                info.courses[i].videos = values[i];

                                for (j = 0; j < values[i].length; j++) {
                                    durationInt = parseInt(values[i][j].duration)
                                    duration = duration + durationInt;
                                }

                                info.courses[i].duration = duration / 3600;
                            }

                            resolve({ code: 200, info: info });
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
                } else {
                    dbCurs.getAllCursos().then(value2 => {

                        info.courses = value2;

                        info.courses.forEach(cou => {

                            promises.push(dbVide.getAllVideosFromCourse(cou.id));
                        });

                        Promise.all(promises).then(values => {
                            for (let i = 0; i < info.courses.length; i++) {
                                let duration = 0;
                                let durationInt = 0;
                                info.courses[i].videos = values[i];

                                for (j = 0; j < values[i].length; j++) {
                                    durationInt = parseInt(values[i][j].duration)
                                    duration = duration + durationInt;
                                }

                                info.courses[i].duration = duration / 3600;
                            }

                            resolve({ code: 200, info: info });
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
                reject({ code: 401, error: { message: "invalidToken" } });
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
                        let duration = 0;
                        let durationInt = 0;
                        resp.courses[i].videos = values[i];
                        for (j = 0; j < values[i].length; j++) {
                            durationInt = parseInt(values[i][j].duration)
                            duration = duration + durationInt;
                        }
                        resp.courses[i].duration = duration / 3600;
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
                reject({ code: 400, error: { message: "backendQueryError" } });
            });
        }

    });
}

async function getAllUserCursos(tokens, id) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;
            info.courses = [];
            if (info.user.id == id) {
                let promises = [];
                let currentDate = new Date().toLocaleDateString();
                let dias = currentDate.split('/')[0];
                let mes = currentDate.split('/')[1];
                let ano = currentDate.split('/')[2];
                currentDate = mes + '-' + dias + '-' + ano;

                let sixmonthsago = new Date();
                sixmonthsago.setMonth(sixmonthsago.getMonth() - 6);

                dbComp.getAllComprasByUser(id).then(value2 => {
                    let promises = [];
                    value2.forEach(cur => {
                        if((cur.id_subscription != null && cur.data_sub == null) || (cur.id_subscription == null && cur.dateBought >= sixmonthsago)) {

                            promises.push(dbVide.getAllVideosFromCourse(cur.id))
                            info.courses.push(cur);
                            
                        }
                    })
                    Promise.all(promises).then(values => {
                        for(let i = 0; i < values.length; i++){
                            let duration = 0;
                            let durationInt = 0;
                            values[i].forEach(c => {
                                durationInt = parseInt(c.duration);
                                duration = duration + durationInt;
                            })
                            info.courses[i].duration = duration/3600;
                        }
                        resolve({ code: 200, info: info });
                    })
                    .catch(error => {
                        console.log(error);
                        reject({ code: 400, error: { message: "backendQueryError" } });
                    })
                })
                .catch(error => {
                    console.log(error);
                    reject({ code: 400, error: { message: "backendQueryError" } });
                })

            } else {
                reject({ code: 403, error: { message: "forbidden" } });
            }
        })
        .catch(error => {
            console.log(error);
            reject({ code: 401, error: { message: "invalidToken" } });
        })
    });
}

async function createCurso(tokens, body) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value1 => {
            let info = value1;
            let id
            let existe

            if(info.user.type != "creator") {
                reject({ code: 403, error: { message: "forbidden" } });
            } else {
            
                dbCurs.isNameTaken(body.name).then(value2 => {

                    if (value2.length > 0) {
                        reject({ code: 400, error: { message: "courseNameTaken" } });
                    } else {

                        dbCurs.getAllCursos().then(value3 => {
                            do {
                                id = uuid.v4();
                                existe = false;

                                value3.forEach(u => {
                                    if (u.id == id) existe = true;
                                });
                            } while (existe)

                            let data = new Date().toLocaleDateString();
                            let dias = data.split('/')[0];
                            let mes = data.split('/')[1];
                            let ano = data.split('/')[2];
                            horas = new Date().getHours();
                            minutos = new Date().getMinutes();
                            segundos = new Date().getSeconds();
                            horario = horas + ':' + minutos + ':' + segundos;
                            body.date = mes + '-' + dias + '-' + ano + ' ' + horario;
                            currentDate = body.date

                            dbCurs.createCurso(id, body).then(value => {
                                dbSubs.getSubscribersFromCreator(info.user.id).then(value4 => {
                                    let promisesComp = [];
                                    if(value4.length > 0) {
                                        let bodyComp = {}
                                        bodyComp.id_course = id;
                                        for(let i = 0; i < value4.length; i++) {
                                            let idComp = uuid.v4();
                                            bodyComp.id_user = value4[i].id_subscriber;
                                            bodyComp.id_subscription = value4[i].id;
                                            promisesComp.push(dbComp.createCompra(idComp, bodyComp, currentDate))
                                        }
                                        Promise.all(promisesComp).then(values => {
                                            info.message = "Curso criado com sucesso.";
                                            resolve({ code: 201, info: info });
                                        })
                                        .catch(error => {
                                            console.log(error);
                                            reject({ code: 400, error: { message: "backendQueryError" } });
                                        });
                                    } 
                                    else {
                                        info.message = "Curso criado com sucesso.";
                                        resolve({ code: 201, info: info });
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
            reject({ code: 401, error: { message: "invalidToken" } })
        });
    });
}

async function updateStateCursoUser(tokens, id, body) {
    return new Promise((resolve, reject) => {

        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;

            dbCurs.getCurso(id).then(value1 => {

                if (value1.length <= 0) {
                    reject({ code: 404, error: { message: "noCourse" } });
                } else {

                    dbCurs.isCourseFromUser(id, info.user.id).then(value2 => {

                        if (value2.length <= 0) {
                            reject({ code: 403, error: { message: "forbidden" } });
                        } else {

                            if (body.state === "Ativo" || body.state === "Inativo") {

                                dbCurs.updateStateCursoUser(body).then(value3 => {
                                    info.message = "Estado alterado com sucesso.";
                                    resolve({ code: 200, info: info });
                                })
                                .catch(error => {
                                    console.log(error);
                                    reject({ code: 400, error: { message: "backendQueryError" } });
                                });

                            } else {
                                reject({ code: 400, error: { message: "invalidState" } });
                            }
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
            reject({ code: 401, error: { message: "invalidToken" } })
        });
    });
}

async function updateStateCursoAdm(tokens, id, body) {
    return new Promise((resolve, reject) => {

        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;

            dbCurs.getCurso(id).then(value1 => {

                if (value1.length <= 0) {
                    reject({ code: 404, error: { message: "noCourse" } });
                } else {

                    if (info.user.type !== "admin") {
                        reject({ code: 403, error: { message: "forbidden" } });
                    } else {

                        if (body.state === "Ativo" || body.state === "Inativo" || body.state === "Pendente" || body.state === "Rejeitado") {

                            dbCurs.updateStateCurso(id, body.state).then(value3 => {

                                //notificacao pro criador do curso
                                let promisesNotif = [];
                                let promises = [];
                                let notif = {}
                                notif.id = uuid.v4();
                                notif.change_state = body.state;

                                let data = new Date().toLocaleDateString();
                                let dias = data.split('/')[0];
                                let mes = data.split('/')[1];
                                let ano = data.split('/')[2];
                                horas = new Date().getHours();
                                minutos = new Date().getMinutes();
                                segundos = new Date().getSeconds();
                                horario = horas + ':' + minutos + ':' + segundos;
                                notif.date = mes + '-' + dias + '-' + ano + ' ' + horario;


                                notif.id_user = value1[0].id_creator;
                                notif.id_course = id;
                                notif.id_video = null;
                                promisesNotif.push(dbNotif.createNotification(notif));
                                //notificacao para o user
                                if (body.state === "Ativo") {
                                    dbSubs.getSubscribersFromCreator(notif.id_user).then(value5 => {
                                        for (let i = 0; i < value5.length; i++) {
                                            let notifUser = {}
                                            notifUser.id = uuid.v4();
                                            notifUser.change_state = body.state;
                                            notifUser.date = notif.date;
                                            notifUser.id_user = value5[i].id_subscriber;
                                            notifUser.id_course = id;
                                            notifUser.id_video = null;

                                            promises.push(dbNotif.createNotification(notifUser));


                                        }
                                        Promise.all(promises).then(values => {
                                            info.message = "Estado alterado com sucesso.";
                                            resolve({ code: 200, info: info });
                                        })
                                        .catch(error => {
                                            console.log(error);
                                            reject({ code: 400, error: { message: "backendQueryError" } })
                                        })
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        reject({ code: 400, error: { message: "backendQueryError" } })
                                    });
                                } else {
                                    info.message = "Estado alterado com sucesso.";
                                    resolve({ code: 200, info: info });
                                }

                            })
                            .catch(error => {
                                console.log(error);
                                reject({ code: 400, error: { message: "backendQueryError" } });
                            });

                        } else {
                            reject({ code: 400, error: { message: "invalidState" } });
                        }
                    }
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
    });
}

async function updateCurso(tokens, id, body) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;

            dbCurs.getCurso(id).then(value1 => {

                if (value1.length <= 0) {
                    reject({ code: 404, error: { message: "noCourse" } });
                } else {

                    dbCurs.isCourseFromUser(id, info.user.id).then(value2 => {

                        if (value2.length <= 0) {
                            reject({ code: 403, error: { message: "forbidden" } });
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
                                    reject({ code: 400, error: { message: "backendQueryError" } });
                                });
                            } else {
                                reject({ code: 400, error: { message: "emptyFields" } });
                            }
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
            reject({ code: 401, error: { message: "invalidToken" } })
        });
    });
}

async function getCursosHomePage() {
    return new Promise((resolve, reject) => {
        let currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() - 3);
        currentDate = currentDate.toLocaleDateString();
        let dias = currentDate.split('/')[0];
        let mes = currentDate.split('/')[1];
        let ano = currentDate.split('/')[2];
        currentDate = mes + '-' + dias + '-' + ano;

        let cursos = {
            recentes: [],
            maisVendidos: [],
            destaques: [],
            recomendados: [],
            outros: [],
        };

        let promises = [];

        promises.push(dbCurs.getMostRecentCursos())
        promises.push(dbCurs.getMostSoldCursos())
        promises.push(dbCurs.getDestaquesCursos(currentDate))
        promises.push(dbCurs.getRecomendedCursos())
        promises.push(dbCurs.getOtherCursos())

        Promise.all(promises).then(values => {
            //começa aqui
            let promisesVideos = [];

            values[0].forEach(cou => {

                promisesVideos.push(dbVide.getAllVideosFromCourse(cou.id));
            });
            values[1].forEach(cou1 => {

                promisesVideos.push(dbVide.getAllVideosFromCourse(cou1.id));
            });
            values[2].forEach(cou2 => {

                promisesVideos.push(dbVide.getAllVideosFromCourse(cou2.id));
            });
            values[3].forEach(cou3 => {

                promisesVideos.push(dbVide.getAllVideosFromCourse(cou3.id));
            });
            values[4].forEach(cou4 => {

                promisesVideos.push(dbVide.getAllVideosFromCourse(cou4.id));
            });

            Promise.all(promisesVideos).then(values1 => {
                for (let a = 0; a < values.length; a++) {
                    for (let b = 0; b < 6; b++) {
                        let duration = 0;
                        let durationInt = 0;
                        for (k = 0; k < values1[6 * a + b].length; k++) {
                            durationInt = parseInt(values1[6 * a + b][k].duration);
                            duration = duration + durationInt;
                        }
                        values[a][b].duration = duration / 3600;
                    }
                }

                cursos.recentes = values[0];
                cursos.maisVendidos = values[1];
                cursos.destaques = values[2];
                cursos.recomendados = values[3];
                cursos.outros = values[4];

                resolve({ code: 200, info: cursos });
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


    });
}

async function rateCourse(tokens, idCourse, body) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;
            dbCurs.getCurso(idCourse).then(value1 => {
                if(value1.length > 0) {
                    if(info.user.id == value1[0].id_creator || info.user.type == "admin") {
                        reject({ code: 403, error: { message: "forbidden" } })
                    }
                    else {
                        dbComp.existsCompra(info.user.id, idCourse).then(value2 => {
                            if(value2.length > 0) {
                                let sixmonthsago = new Date();
                                sixmonthsago.setMonth(sixmonthsago.getMonth() - 6);
                                let id = 0;
                                let mostRecent = new Date();
                                mostRecent.setMonth(mostRecent.getMonth() - 6);
                                
                                for(let i = 0; i < value2.length; i++) {
                                    if((value2[i].id_subscription != null && value2[i].data_sub == null) || (value2[i].id_subscription == null && value2[i].date_bought >= sixmonthsago)) {
                                        if(value2[i].date_bought > mostRecent) {
                                            mostRecent = value2[i].dateBought;
                                            id = value2[i].id;
                                        } 
                                    }
                                }
                                if(id != 0) {
                                    let promises = [];
                                    promises.push(dbCurs.rateCourse(body.rating, id));
                                    promises.push(dbCurs.updateRating(idCourse));
                                        
                                    Promise.all(promises).then(values => {
                                        info.message = "Rating alterado com sucesso.";
                                        resolve({ code: 200, info: info });
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        reject({ code: 401, error: { message: "backendQueryError" } })
                                    });
                                }
                                else {
                                    reject({ code: 404, error: { message: "noTransaction" } });
                                }
                            }
                            else {
                                reject({ code: 404, error: { message: "noTransaction" } });
                            }
                        })
                        .catch(error => {
                            console.log(error);
                            reject({ code: 400, error: { message: "backendQueryError" } });
                        });
                    }

                }
                else {
                    reject({ code: 404, error: { message: "noCourse" } });
                }
            })
            .catch(error => {
                console.log(error);
                reject({ code: 401, error: { message: "invalidToken" } })
            });

        })
        .catch(error => {
            console.log(error);
            reject({ code: 401, error: { message: "invalidToken" } })
        });
    })
}

module.exports = {
    getCurso: getCurso,
    getAllCursos: getAllCursos,
    getAllUserCursos: getAllUserCursos,
    createCurso: createCurso,
    updateStateCursoUser: updateStateCursoUser,
    updateStateCursoAdm: updateStateCursoAdm,
    updateCurso: updateCurso,
    getCursosHomePage: getCursosHomePage,
    rateCourse: rateCourse
}