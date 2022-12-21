const pg = require('pg');

const client = new pg.Client({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    port: process.env.DBPORT,
    password: process.env.DBPW,
    database: process.env.DBNAME
});

client.connect();

async function getGastos(){
    
    return new Promise((resolve, reject) => {
        client.query(`SELECT g.id AS idGasto, g.valor AS valor, g.data AS data, g.fornecedor AS idFornecedor, f.nome AS nomeFornecedor, f.descricao AS descFornecedor FROM gastos g LEFT JOIN fornecedores f ON g.fornecedor = f.id`, (err, res) => {
            if(!err) {
                resolve(res.rows);
            } else {
                reject(err.message);
            }

            client.end;
        });
    });
}

module.exports = {
    getGastos: getGastos,
}