const utils = require('../utils/index.js');
const uuid = require('uuid');

const dbVideo = require('../db/video.js');
const dbUser = require('../db/user.js');
const dbNotif = require('../db/notification.js');
const dbCurs = require('../db/curso.js');
const dbComp = require('../db/compra');
const dbSubs = require('../db/subscricao');

async function getVideo(headers, id) {
    return new Promise((resolve, reject) => {

        let access_token;
        let refresh_token;

        if (headers['authorization']) {
            access_token = headers['authorization'].split(' ')[1];
            refresh_token = headers.refreshtoken;
        }

        utils.validateToken(access_token, refresh_token).then(value1 => {
            let info = value1;
            dbVideo.getVideo(id).then(value2 => {
                if (value2.length <= 0) {
                    reject({ code: 404, error: { message: "noVideo" } });
                } else {
                    info.video = value2;
                    resolve({ code: 200, info: info });
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

async function getAllVideos(headers, id) {
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
                dbVideo.getAllVideosFromCourse(id).then(value2 => {
                    info.videos = value2;
                    resolve({ code: 200, info: info });
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
            dbVideo.getAllVideosFromCourse(id).then(value => {
                let resp = {
                    videos: value
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

async function createVideo(tokens, body) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value1 => {
            let info = value1;
            let id
            let existe
            if(info.user.type != "creator") {
                reject({ code: 403, error: { message: "forbidden" } });
            } else {
                dbUser.getAllUsers().then(value3 => {
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

                    dbVideo.createVideo(id, body).then(value => {
                        info.message = "Vídeo criado com sucesso.";
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
            reject({ code: 401, error: { message: "invalidToken" } })
        });
    });
}

async function updateStateVideoUser(tokens, body) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;

            dbVideo.getVideo(body.id).then(value1 => {

                if (value1.length <= 0) {
                    reject({ code: 404, error: { message: "noVideo" } });
                } else {

                    dbVideo.isVideoFromCourse(body.id, body.id_course).then(value2 => {

                        if (value2.length <= 0) {
                            reject({ code: 400, error: { message: "backendQueryError" } });
                        } else {

                            dbVideo.isCourseFromUser(body.id_course, info.user.id).then(value3 => {

                                if (value3.length <= 0) {
                                    reject({ code: 403, error: { message: "forbidden" } });
                                } else {

                                    if (body.state === "Ativo" || body.state === "Inativo") {

                                        dbVideo.updateStateVideo(body).then(value3 => {
                                            info.message = "Estado alterado com sucesso.";
                                            resolve({ code: 200, info: info });
                                        })
                                        .catch(error => {
                                            console.log(error);
                                            reject({ code: 400, error: { message: "backendQueryError" } });
                                        });

                                    } else {

                                        reject({ code: 400, error: { message: "invalidState" } })

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

async function updateStateVideoAdm(tokens, id, body) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;
            dbVideo.getVideo(id).then(value1 => {

                if (value1.length <= 0) {
                    reject({ code: 404, error: { message: "noVideo" } });
                } else {

                    dbVideo.isVideoFromCourse(id, body.id_course).then(value2 => {

                        if (value2.length <= 0) {
                            reject({ code: 400, error: { message: "backendQueryError" } });
                        } else {

                            if (info.user.type !== "admin") {
                                reject({ code: 403, error: { message: "forbidden" } });
                            } else {

                                if (body.state === "Ativo" || body.state === "Inativo" || body.state === "Pendente" || body.state === "Rejeitado") {

                                    dbVideo.updateStateVideo(id, body.state).then(value3 => {
                                        dbCurs.getCurso(body.id_course).then(value4 => {
                                            let promisesNotif = [];
                                            let promises = [];
                                            let notif = {}
                                            notif.id = uuid.v4();
                                            notif.change_state = body.state;

                                            data = new Date().toLocaleDateString();
                                            dias = data.split('/')[0];
                                            mes = data.split('/')[1];
                                            ano = data.split('/')[2];

                                            horas = new Date().getHours();
                                            minutos = new Date().getMinutes();
                                            segundos = new Date().getSeconds();
                                            horario = horas + ':' + minutos + ':' + segundos;
                                            notif.date = mes + '-' + dias + '-' + ano + ' ' + horario;

                                            notif.id_user = value4[0].id_creator;
                                            notif.id_course = body.id_course;
                                            notif.id_video = id;
                                            promisesNotif.push(dbNotif.createNotification(notif));

                                            if (body.state === "Ativo") {

                                                promises.push(dbSubs.getSubscribersFromCreator(notif.id_user));

                                                //notificacao pra quem comprou o curso
                                                promises.push(dbComp.getUsersThatBoughtThisCourse(body.id_course));

                                                Promise.all(promises).then(values => {
                                                    for (let i = 0; i < values[0].length; i++) {
                                                        let notifUser = {}
                                                        notifUser.id = uuid.v4();
                                                        notifUser.change_state = body.state;

                                                        notifUser.date = notif.date

                                                        notifUser.id_user = values[0][i].id_subscriber;
                                                        notifUser.id_course = body.id_course;
                                                        notifUser.id_video = id;
                                                        promisesNotif.push(dbNotif.createNotification(notifUser));

                                                    }

                                                    for (let j = 0; j < values[1].length; j++) {
                                                        let notifUser = {}
                                                        notifUser.id = uuid.v4();
                                                        notifUser.change_state = body.state;

                                                        data = new Date().toLocaleDateString();
                                                        dias = data.split('/')[0];
                                                        mes = data.split('/')[1];
                                                        ano = data.split('/')[2];
                                                        horas = new Date().getHours();
                                                        minutos = new Date().getMinutes();
                                                        segundos = new Date().getSeconds();
                                                        horario = horas + ':' + minutos + ':' + segundos;
                                                        notifUser.date = mes + '-' + dias + '-' + ano + ' ' + horario;

                                                        notifUser.id_user = values[1][j].id_user;
                                                        notifUser.id_course = body.id_course;
                                                        notifUser.id_video = null;
                                                        promisesNotif.push(dbNotif.createNotification(notifUser));
                                                    }

                                                    Promise.all(promisesNotif).then(valuesFinal => {
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
                                                })
                                            } else {
                                                info.message = "Estado alterado com sucesso.";
                                                resolve({ code: 200, info: info });
                                            }

                                        })
                                        .catch(error => {
                                            console.log(error);
                                            reject({ code: 400, error: { message: "backendQueryError" } });
                                        })

                                    })
                                    .catch(error => {
                                        console.log(error);
                                        reject({ code: 400, error: { message: "backendQueryError" } });
                                    });

                                } else {
                                    reject({ code: 400, error: { message: "invalidState" } })
                                }
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

async function updateVideo(tokens, body) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;

            dbVideo.getVideo(body.id).then(value1 => {

                if (value1.length <= 0) {
                    reject({ code: 404, error: { message: "noVideo" } });
                } else {

                    dbVideo.isVideoFromCourse(body.id, body.id_course).then(value2 => {

                        if (value2.length <= 0) {
                            reject({ code: 400, error: { message: "backendQueryError" } });
                        } else {

                            dbVideo.isCourseFromUser(body.id_course, info.user.id).then(value3 => {

                                if (value3.length <= 0) {
                                    reject({ code: 403, error: { message: "forbidden" } });
                                } else {

                                    let id = body.id;
                                    let title = body.title;
                                    let video = body.video;
                                    let duration = body.duration;
                                    let image = body.image;
                                    let description = body.description;


                                    if (id !== null || title !== null || video !== null || duration !== null || image !== null || description !== null) {

                                        dbVideo.updateVideo(body).then(value3 => {
                                            info.message = "Vídeo alterado com sucesso.";
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


module.exports = {
    getVideo: getVideo,
    getAllVideos: getAllVideos,
    createVideo: createVideo,
    updateStateVideoUser: updateStateVideoUser,
    updateStateVideoAdm: updateStateVideoAdm,
    updateVideo: updateVideo,
}