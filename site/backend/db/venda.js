const pg = require('pg');

const client = new pg.Client({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    port: process.env.DBPORT,
    password: process.env.DBPW,
    database: process.env.DBNAME
});

client.connect();

async function getVendas(){
    
    return new Promise((resolve, reject) => {
        client.query(`SELECT * FROM vendas`, (err, res) => {
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
    getVendas: getVendas,
}