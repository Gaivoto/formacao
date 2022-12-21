const utils = require('../utils/index.js');

const dbVenda = require('../db/venda.js');

async function getVendas(tokens){
    return new Promise((resolve, reject) => {

        utils.validateToken(tokens.access_token, tokens.refresh_token).then(value => {
            let info = value;

            let resp = {vendas: []};

            dbVenda.getVendas().then(value => {
                value.forEach(ven => {
                    resp.vendas.push({
                        id: ven.invoice_id,
                        supermercado: ven.branch,
                        cidade: ven.city,
                        tipo_cliente: ven.customer_type,
                        sexokkk: ven.gender,
                        categoria_prod: ven.product_line,
                        preco_unit: ven.unit_price,
                        quantidade: ven.quantity,
                        taxa5: ven.tax_5,
                        total: ven.total,
                        data: ven.date.toLocaleDateString(),
                        hora: ven.time,
                        tipo_pagamento: ven.payment,
                        rating: ven.rating,
                        lucro: ven.gross_income,
                        margem_lucro: ven.gross_margin_percentage,
                        custo_bens_vendidos: ven.cogs
                    });
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
    getVendas: getVendas
}