/*const serVide = require('../services/video.js');

async function createVideo(req, res){
    serVide.createVideo({access_token: req.headers['authorization'].split(' ')[1], refresh_token: req.headers.refreshtoken}, req.body.username, req.body.password).then(value => {
        res.status(value.code).send(value.info);
    })
    .catch(error => {
        res.status(error.code).send(error.message);
    });
}

module.exports = {
    createVideo: createVideo
}*/