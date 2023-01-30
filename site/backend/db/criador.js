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

const pool = new sql.Request();

async function getAllCriadores() {
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [Users] where [type] = 'creator'`;
        pool.query(slct, (err, res) => {
            if(!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function getCriador(id) {
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [Users] WHERE [id] = '${id}' AND [type] = 'creator'`;
        pool.query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function createCriador(id, user) {
    return new Promise((resolve, reject) => {
        const insrt = `INSERT INTO [Users] ([id], [username], [password], [type], [name], [email], [description], [image], [state], [price]) 
        VALUES ('${id}', '${user.username}', '${user.password}', 'creator', '${user.name}', '${user.email}', '${user.description}', '${user.image}', 'Ativo', ${user.price})`;
        pool.query(insrt, (err, res) => {
            if (!err) {
                resolve(res);
            } else {
                reject(err.message);
            }
        });
    });
}

async function updateCriador(user, id) {
    return new Promise((resolve, reject) => {
        const updt = `UPDATE [Users] SET [name] = '${user.name}', [description] = '${user.description}', [price] = ${user.price}, [image] = '${user.image}' WHERE id = '${id}' AND [type] = 'creator'`;
        pool.query(updt, (err, res) => {
            if (!err) {
                resolve(res);
            } else {
                reject(err.message);
            }
        });
    });
}

async function changeCriadorState(state, id) {
    return new Promise((resolve, reject) => {
        const updt = `UPDATE [Users] SET [state] = '${state}' WHERE [id] = '${id}' AND [type] = 'creator'`;
        pool.query(updt, (err, res) => {
            if(!err) {
                resolve(res);
            } else {
                reject(err.message);
            }
        });
    });
}

module.exports = {
    getAllCriadores: getAllCriadores,
    getCriador: getCriador,
    createCriador: createCriador,
    updateCriador: updateCriador,
    changeCriadorState: changeCriadorState
}