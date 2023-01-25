const utils = require('../utils/index.js');
const uuid = require('uuid');

const dbVideo = require('../db/video.js');
const dbUser = require('../db/user.js');

async function getVideo(tokens, id){
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value1 => {
            let info = value1;
            dbVideo.getVideo(id).then(value2 => {

                if(value2.length <= 0) {
                    reject({ code: 404, error: {message: "Curso não existe." }});
                } else {
                    info.video = value2;
                    resolve({ code: 200, info: info });
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
    });
}

async function getAllVideos(headers, id) {
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
                dbVideo.getAllVideosFromCourse(id).then(value2 => { 
                    info.videos = value2;
                    resolve({ code: 200, info: info });
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
            dbVideo.getAllVideosFromCourse(id).then(value => {
                let resp = {
                    videos: value
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

async function createVideo(tokens, body) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value1 => {
            let info = value1;
            let id
            let existe

            dbVideo.isTitleTaken(body.title).then(value2 => {

                if(value2.length > 0) {
                    reject({ code: 403, error: {message: "Esse nome já está a ser utilizado." }});
                } else {

                    dbUser.getAllUsers().then(value3 => {
    
                        do {
                            id = uuid.v4();
                            existe = false;
        
                            value3.forEach(u => {
                                if(u.id == id) existe = true;
                            });
                        } while(existe)
    
                        dbVideo.createVideo(id, body).then(value => {
                            info.message = "Vídeo criado com sucesso.";
                            resolve({ code: 200, info: info });
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
                reject({ code: 400, error: {message: "Algo correu mal com a query." }});
            });

        })
        .catch(error => {
            console.log(error);
            reject({ code: 401, error: {message: "Token inválido."}})
        });
    });
}

async function updateStateVideoUser(tokens, body) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;

            dbVideo.getVideo(body.id).then(value1 => {
                
                if(value1.length <= 0) {
                    reject({ code: 404, error: {message: "Video não existe." }});
                } else {

                    dbVideo.isVideoFromCourse(body.id, body.id_course).then(value2 => {

                        if(value2.length <= 0) {
                            reject({ code: 403, error: {message: "Video não pertence a este user." }});
                        } else {

                            dbVideo.isCourseFromUser(body.id_course, info.user.id).then(value3 => {

                                if(value3.length <= 0) {
                                    reject({ code: 403, error: {message: "Video não pertence a este user." }});
                                } else {

                                    if(body.state === "Ativo" || body.state === "Inativo") {
                                
                                        dbVideo.updateStateVideo(body).then(value3 => {
                                            info.message = "Estado alterado com sucesso.";
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
                }
            })
            .catch(error => {
                console.log(error);
                reject({ code: 400, error: {message: "Algo correu mal com a query." }});
            });
        })
        .catch(error => {
            console.log(error);
            reject({ code: 401, error: {message: "Token inválido."}})
        });
    });
}

async function updateStateVideoAdm(tokens, body) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;

            dbVideo.getVideo(body.id).then(value1 => {
                
                if(value1.length <= 0) {
                    reject({ code: 404, error: {message: "Video não existe." }});
                } else {

                    dbVideo.isVideoFromCourse(body.id, body.id_course).then(value2 => {

                        if(value2.length <= 0) {
                            reject({ code: 403, error: {message: "Video não pertence a este curso." }});
                        } else {

                            if(info.user.type !== "admin") {
                                reject({ code: 403, error: {message: "Não possui permissão para esta operação." }});
                            } else {

                                if(body.state === "Ativo" || body.state === "Inativo" || body.state === "Pendente" || body.state === "Rejeitado") {
                            
                                    dbVideo.updateStateVideo(body).then(value3 => {
                                        info.message = "Estado alterado com sucesso.";
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
            reject({ code: 401, error: {message: "Token inválido."}})
        });
    });
}

async function updateVideo(tokens, body) {
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;

            dbVideo.getVideo(body.id).then(value1 => {
                
                if(value1.length <= 0) {
                    reject({ code: 404, error: {message: "Video não existe." }});
                } else {

                    dbVideo.isVideoFromCourse(body.id, body.id_course).then(value2 => {

                        if(value2.length <= 0) {
                            reject({ code: 403, error: {message: "Video não pertence a este user." }});
                        } else {

                            dbVideo.isCourseFromUser(body.id_course, info.user.id).then(value3 => {

                                if(value3.length <= 0) {
                                    reject({ code: 403, error: {message: "Video não pertence a este user." }});
                                } else {
        
                                    let id = body.id;
                                    let title = body.title;
                                    let video = body.video;
                                    let duration = body.duration;
                                    let image = body.image;
                                    let description = body.description;
        
        
                                    if(id !== null || title !== null || video !== null || duration !== null || image !== null || description !== null) {
                                        
                                        dbVideo.updateVideo(body).then(value3 => {
                                            info.message = "Vídeo alterado com sucesso.";
                                            resolve({ code: 200, info: info });
                                        })
                                        .catch(error => {
                                            console.log(error);
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
                }
            })
            .catch(error => {
                console.log(error);
                reject({ code: 400, error: {message: "Algo correu mal com a query." }});
            });

        })
        .catch(error => {
            console.log(error);
            reject({ code: 401, error: {message: "Token inválido."}})
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