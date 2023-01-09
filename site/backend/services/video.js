const utils = require('../utils/index.js');

const dbVideo = require('../db/video.js');

async function getVideos(tokens){
    return new Promise((resolve, reject) => {

        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;

            let resp = {videos: []};

            dbVideo.getVideos().then(value => {
                value.forEach(vid => {
                    resp.videos.push(vid);
                });

                if(info.access_token) resp.access_token = info.access_token;

                resolve({code: 200, info: resp});
            })
            .catch(error => {
                console.log(error);
                reject({code: 400, message: "Algo correu mal com a query."});
            });
        })
        .catch(error => reject({code: 401, message: "Token inválido."}));
    });
}

module.exports = {
    getVideos: getVideos
}