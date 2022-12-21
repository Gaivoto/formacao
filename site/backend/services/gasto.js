const utils = require('../utils/index.js');

const dbGast = require('../db/gasto.js');

async function getGastos(tokens){
    return new Promise((resolve, reject) => {

        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;

            let resp = {gastos: []};

            dbGast.getGastos().then(value => {
                value.forEach(gas => {
                    resp.gastos.push(gas);
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
    getGastos: getGastos
}