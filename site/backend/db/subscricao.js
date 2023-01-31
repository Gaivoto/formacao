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
});

async function getSubscricao(id) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [Subscription] WHERE [id] = @id`;
        pool.input('id', sql.VarChar(200), id).query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function getAllSubscricoes() {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [Subscription]`;
        pool.query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function getAllSubscricoesByUser(id) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [Subscription] WHERE [id_subscriber] = @id AND [final_date] IS NULL`;
        pool.input('id', sql.VarChar(200), id).query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function createSubscricao(id, body) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `INSERT INTO Subscription (id, id_subscriber, id_subscribed, start_date) VALUES (@id, @idU, @idC, @sD)`;
        pool.input('id', sql.VarChar(200), id).input('idU', sql.VarChar(100), body.id_subscriber).input('idC', sql.VarChar(100), body.id_subscribed).input('sD', sql.DateTime, body.start_date).query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function endSubscricao(final_date, id) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        let slct = `UPDATE Subscription SET [final_date] = @fD WHERE [id] = @id`;
        pool.input('id', sql.VarChar(200), id).input('fD', sql.DateTime, final_date).query(slct, (err, res) => {
            if (!err) {
                resolve(res);
            } else {
                reject(err.message);
            }
        });
    });
}

async function existsSubscricao(id_subscriber, id_subscribed) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [Subscription] WHERE [id_subscriber] = @idU AND [id_subscribed] = @idC`;
        pool.input('idU', sql.VarChar(100), id_subscriber).input('idC', sql.VarChar(100), id_subscribed).query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function getSubscribersFromCreator(id_creator) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT [id], [id_subscriber] FROM Subscription WHERE [final_date] IS NULL AND [id_subscribed] = @idC`;
        pool.input('idC', sql.VarChar(100), id_creator).query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

module.exports = {
    getSubscricao: getSubscricao,
    getAllSubscricoes: getAllSubscricoes,
    getAllSubscricoesByUser: getAllSubscricoesByUser,
    createSubscricao: createSubscricao,
    endSubscricao: endSubscricao,
    existsSubscricao: existsSubscricao,
    getSubscribersFromCreator: getSubscribersFromCreator
}