const serVide = require('../services/video.js');

async function getVideo(req, res){
    serVide.getVideo(req.headers).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function getAllVideos(req, res){
    serVide.getAllVideos(req.headers).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function createVideo(req, res){
    serVide.createVideo({access_token: req.headers['authorization'].split(' ')[1], refresh_token: req.headers.refreshtoken}, req.body).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function removeVideo(req, res){
    serVide.removeVideo({access_token: req.headers['authorization'].split(' ')[1], refresh_token: req.headers.refreshtoken}, req.body).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

async function updateVideo(req, res){
    serVide.updateVideo({access_token: req.headers['authorization'].split(' ')[1], refresh_token: req.headers.refreshtoken}, req.body).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.error);
    });
}

module.exports = {
    getVideo: getVideo,
    getAllVideos: getAllVideos,
    createVideo: createVideo,
    removeVideo: removeVideo,
    updateVideo: updateVideo,
}