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

async function getCompra(id) {
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [User_Course] WHERE [id] = '${id}'`;
        pool.query(slct, (err, res) => {
            if(!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function getAllCompras() {
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [User_Course]`;
        pool.query(slct, (err, res) => {
            if(!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function existsCompra(idU, idC) {
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [User_Course] WHERE [id_user] = '${idU}' AND [id_course] = '${idC}'`;
        pool.query(slct, (err, res) => {
            if(!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function createCompra(id, body, currentDate) {
    return new Promise((resolve, reject) => {

        const slct = `INSERT INTO User_Course (id, id_user, id_course, date_bought, progress) VALUES ('${id}', '${body.id_user}', '${body.id_course}', '${currentDate}', 0)`;
        pool.query(slct, (err, res) => {
            if(!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

module.exports = {
    getCompra: getCompra,
    getAllCompras: getAllCompras,
    existsCompra: existsCompra,
    createCompra: createCompra,
}