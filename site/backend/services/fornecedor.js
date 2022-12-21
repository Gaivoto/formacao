const utils = require('../utils/index.js');

const dbForn = require('../db/fornecedor.js');

async function getFornecedores(tokens){
    return new Promise((resolve, reject) => {

        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;

            let resp = {fornecedores: []};

            dbForn.getFornecedores().then(value => {
                let current_forn = 0;
                
                value.forEach(forn => {

                    if(forn.idfornecedor != current_forn) {
                        current_forn = forn.idfornecedor;
                        resp.fornecedores.push({idFornecedor: forn.idfornecedor, nome: forn.nomefornecedor, descricao: forn.descfornecedor, gastos: []});
                    }
                    
                    resp.fornecedores.forEach(f => {
                        if(f.idFornecedor == current_forn) {
                            f.gastos.push({idGasto: forn.idgasto, valor: forn.valor, data: forn.data});
                        }
                    })
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
    getFornecedores: getFornecedores
}