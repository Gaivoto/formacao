const uuid = require('uuid');
const utils = require('../utils/index.js');
const dbCria = require('../db/criador.js');
const dbCour = require('../db/curso.js');
const dbUser = require('../db/user.js');
const dbNotif = require('../db/notification.js');
const dbSubs = require('../db/subscricao.js');
const dbVide = require('../db/video.js');

async function getAllCriadores(headers) {
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
                    dbCria.getAllCriadores().then(value2 => {
                        info.criadores = value2;
                        resolve({ code: 200, info: info });
                    })
                    .catch(error => {
                        console.log(error);
                        reject({ code: 400, error: { message: "backendQueryError" } });
                    });
            })
            .catch(error => {
                console.log(error);
                reject({ code: 401, error: { message: "invalidToken" } });
            });
        } else {
            dbCria.getAllCriadores().then(value2 => {
                let info = {
                    criadores: value2
                }
                
                resolve({ code: 200, info: info });
            })
            .catch(error => {
                console.log(error);
                reject({ code: 400, error: { message: "backendQueryError" } });
            });
        }
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
                        reject({ code: 404, error: { message: "noCreator" } });
                    } else {
                        dbCour.getCursosByCriador(id).then(value3 => {
                            let resp = {
                                criador: value2[0],
                                access_token: value.access_token
                            }

                            let promises = [];

                            //verificar subscription
                            promises.push(dbSubs.existsSubscricao(value.user.id, id));

                            value3.forEach(c => {
                                promises.push(dbVide.getAllVideosFromCourse(c.id_course));
                            });

                            Promise.all(promises).then(values => {
                                if(values[0].length == 0) {
                                    resp.criador.id_subscription = null;
                                } else {
                                    resp.criador.id_subscription = null;
                                    values[0].forEach(s => {
                                        if(s.start_date != null && s.final_date == null) {
                                            resp.criador.id_subscription = s.id;
                                        }
                                    });
                                }
                                for (let i = 1; i < values.length; i++) {
                                    let duration = 0;
                                    let durationInt = 0;
                                    let nVideos = 0;
                                    
                                    for(j = 0; j < values[i].length; j++) {
                                        durationInt = parseInt(values[i][j].duration)
                                        duration = duration + durationInt;
                                        nVideos++;
                                    }
                                    
                                    value3[i - 1].duration = duration/3600;
                                    value3[i - 1].numberOfVideos = nVideos;
                                }

                                resp.criador.cursos = value3;

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
            dbCria.getCriador(id).then(value => {
                if (value.length == 0) {
                    reject({ code: 404, error: { message: "noCreator" } });
                } else {
                    dbCour.getCursosByCriador(id).then(value2 => {
                        let criador = value[0];
                        criador.cursos = value2;

                        let promises = [];

                        value2.forEach(c => {
                            promises.push(dbVide.getAllVideosFromCourse(c.id));
                        });

                        Promise.all(promises).then(values => {
                            for (let i = 0; i < values.length; i++) {
                                let duration = 0;
                                let durationInt = 0;
                                let nVideos = 0;
                                
                                for(j = 0; j < values[i].length; j++) {
                                    durationInt = parseInt(values[i][j].duration)
                                    duration = duration + durationInt;
                                    nVideos++;
                                }
                                
                                value2[i].duration = duration/3600;
                                value2[i].numberOfVideos = nVideos;
                            }

                            criador.cursos = value2;

                            resolve({ code: 200, info: { criador: criador } });
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
                                    reject({ code: 400, error: { message: "backendQueryError" } });
                                });
                        })
                            .catch(error => {
                                console.log(error);
                                reject({ code: 400, error: { message: "backendQueryError" } });
                            });
                    } else {
                        reject({ code: 400, error: { message: 'usernameTaken' } });
                    }
                })
                    .catch(error => {
                        console.log(error);
                        reject({ code: 400, error: { message: 'backendQueryError' } });
                    });

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

async function changeCriadorState(tokens, id, criador) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;
            if (info.user.type == 'admin') {

                dbCria.getCriador(id).then(value2 => {
                    if (value2.length == 0) {
                        reject({ code: 404, error: { message: "noCreator" } });
                    } else {
                        if (criador.state == "Inativo" || criador.state == "Ativo") {
                            dbCria.changeCriadorState(criador.state, id).then(value => {
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
            } else {
                reject({ code: 403, error: { message: "forbidden" } });
            }
        })
        .catch(error => {
            console.log(error);
            reject({ code: 401, error: { message: "invalidToken" } });
        });
    });
}

async function updateCriador(tokens, id, criador) {

    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;
            if (info.user.id == id) {
                if (criador.name == "" || criador.image == "" || criador.price == "" || criador.name == null || criador.image == null || criador.price == null || criador.description == null || criador.price < 0) {
                    reject({ code: 400, error: { message: "emptyFields" } });
                } else {
                    dbCria.getCriador(id).then(value1 => {
                        if (value1[0].price != criador.price) {

                            dbCria.updateCriador(criador, id).then(value => {
                                let data = new Date().toLocaleDateString();
                                let dias = data.split('/')[0];
                                let mes = data.split('/')[1];
                                ano = data.split('/')[2];

                                
                                horas = new Date().getHours();
                                minutos = new Date().getMinutes();
                                segundos = new Date().getSeconds();
                                horario = horas + ':' + minutos + ':' + segundos;
                                dataAtual = mes + '-' + dias + '-' + ano + ' ' + horario;

                                dbSubs.getSubscribersFromCreator(id).then(value2 => {
                                    if (value2.length == 0) {
                                        info.message = "Criador alterado com sucesso.";
                                        resolve({ code: 200, info: info });
                                    } else {
                                        for (let i = 0; i < value2.length; i++) {
                                            let notif = {}
                                            notif.id = uuid.v4();
                                            notif.message = 'O valor da subscrição do criador ' + value1[0].name + 'foi alterado de €' + value1[0].price + ' para ' + '€' + criador.price + '.';
                                            notif.date = dataAtual
                                            notif.id_user = value2[i].id;
                                            notif.id_course = null;
                                            notif.id_video = null;
                                            dbNotif.createNotification(notif).then(value3 => {
                                                info.message = "Criador alterado com sucesso.";
                                                resolve({ code: 200, info: info });
                                            })
                                            .catch(error => {
                                                console.log(error);
                                                reject({ code: 400, error: { message: "backendQueryError" } });
                                            })
                                        }
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
                            dbCria.updateCriador(criador, id).then(value3 => {
                                info.message = "Criador alterado com sucesso.";
                                resolve({ code: 200, info: info });
                            })
                            .catch(error => {
                                console.log(error);
                                reject({ code: 400, error: { message: "backendQueryError" } });
                            })
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        reject({ code: 400, error: { message: "backendQueryError" } });
                    })
                }
            } else {
                reject({ code: 403, error: { message: "forbidden" } });
            }
        })
        .catch(error => {
            console.log(error);
            reject({ code: 401, error: { message: "invalidToken" } });
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

            resolve({ code: 200, info: {creators: creators} });

        })
        .catch(error => {
            console.log(error);
            reject({ code: 400, error: { message: "backendQueryError" } });
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