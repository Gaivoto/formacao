const sql = require("mssql");

const config = {
    user: process.env.DBUSER,
    password: process.env.DBPW,
    server: process.env.DBHOST,
    database: process.env.DBNAME,
    trustServerCertificate: true,
    encrypt: true
};

sql.connect(config, function (err) {
    if (err) throw err;
    console.log("Connected!");
});

const pool = new sql.Request();

async function getSubscricao(id) {
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [Subscription] WHERE [id] = '${id}'`;
        pool.query(slct, (err, res) => {
            if(!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function getAllSubscricoes() {
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [Subscription]`;
        pool.query(slct, (err, res) => {
            if(!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function createSubscricao(id, body) {
    return new Promise((resolve, reject) => {

        const slct = `INSERT INTO Subscription (id, id_subscriber, id_subscribed, start_date) VALUES ('${id}', '${body.id_subscriber}', '${body.id_subscribed}', '${body.start_date}')`;
        pool.query(slct, (err, res) => {
            if(!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function endSubscricao(final_date, id) {
    return new Promise((resolve, reject) => {

        let slct = `UPDATE Subscription SET [final_date] = '${final_date}' WHERE [id] = '${id}'`;
        
        pool.query(slct, (err, res) => {
            if(!err) {
                resolve(res);
            } else {
                reject(err.message);
            }
        });
    });
}

module.exports = {
    getSubscricao: getSubscricao,
    getAllSubscricoes: getAllSubscricoes,
    createSubscricao: createSubscricao,
    endSubscricao: endSubscricao,
}