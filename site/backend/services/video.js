const utils = require('../utils/index.js');
const uuid = require('uuid');

const dbVideo = require('../db/video.js');

async function getVideo(tokens, id){
    return new Promise((resolve, reject) => {
        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;
            dbVideo.getVideo(id).then(value => {

                let resp = {
                    videos: value,
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

async function getAllVideos(headers) {
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
                dbVideo.getAllVideos().then(value2 => {
                    
                    let resp = {
                        videos: value2,
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
            dbVideo.getAllVideos().then(value => {
                let resp = {
                    videos: value
                }
                resolve({ code: 200, info: resp });
            })
            .catch(error => {
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

                    do {
                        
                        id = uuid.v4();
                        existe = false;

                        dbVideo.isIDTaken(id).then(value3 => {
                            
                            if(value3.length >= 0) {
                                existe = true;
                            }

                        })
                        .catch(error => {
                            reject({ code: 400, error: {message: "Algo correu mal com a query." }});
                        });

                    } while(existe === true)

                    //FALTA METER FUNCAO PARA VER QUAL A POSITION DO VIDEO

                    dbVideo.createVideo(id, body).then(value => {

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

module.exports = {
    getVideo: getVideo,
    getAllVideos: getAllVideos,
    createVideo: createVideo,
}