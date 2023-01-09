const utils = require('../utils/index.js');

const dbSubs = require('../db/subscricao.js');

async function getSubscricoes(tokens){
    return new Promise((resolve, reject) => {

        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;

            let resp = {subscricoes: []};

            dbSubs.getSubscricoes().then(value => {
                let current_subs = 0;
                
                value.forEach(subs => {
 
                    resp.subscricoes.push(subs)
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
    getSubscricoes: getSubscricoes
}