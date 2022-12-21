const pg = require('pg');

const client = new pg.Client({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    port: process.env.DBPORT,
    password: process.env.DBPW,
    database: process.env.DBNAME
});

client.connect();

async function getFornecedores(){
    
    return new Promise((resolve, reject) => {
        client.query(`SELECT f.id AS idFornecedor, f.nome AS nomeFornecedor, f.descricao AS descFornecedor, g.id AS idGasto, g.valor AS valor, g.data AS data FROM fornecedores f LEFT JOIN gastos g ON g.fornecedor = f.id ORDER BY f.id`, (err, res) => {
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
    getFornecedores: getFornecedores,
}