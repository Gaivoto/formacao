/*const utils = require('../utils/index.js');

const dbDipl = require('../db/dipoma.js');

async function getDiplomas(tokens){
    return new Promise((resolve, reject) => {

        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;

            let resp = {diplomas: []};

            dbGast.getDiplomas().then(value => {
                value.forEach(dip => {
                    resp.diplomas.push(dip);
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
    getDiplomas: getDiplomas
}*/