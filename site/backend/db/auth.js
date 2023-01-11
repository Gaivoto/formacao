const sql = require("mssql");

const config = {
    user: 'sa',
    password: 'letbren3',
    server: 'localhost',
    database: 'projeto_discord',
    trustServerCertificate: true,
    encrypt: true
};

sql.connect(config, function (err) {
    if (err) throw err;
    console.log("Connected!");
});

const pool = new sql.Request();

async function authenticateUser(username, password){
    return new Promise((resolve, reject) => {
        client.query(`SELECT * FROM utilizadores WHERE username = '${username}' AND password = '${password}'`, (err, res) => {
            if(!err) {
                resolve(res.rows);
            } else {
                reject(err.message);
            }
        });
    });
}

async function createToken(token){
    return new Promise((resolve, reject) => {
        client.query(`INSERT INTO refresh_tokens (token) VALUES ('${token}')`, (err, res) => {
            if(!err) {
                resolve('Token stored with success.');
            } else {
                reject(err.message);
            }
        });
    });
}

async function checkToken(token){
    return new Promise((resolve, reject) => {
        client.query(`SELECT * FROM refresh_tokens WHERE token = '${token}'`, (err, res) => {
            if(!err) {
                resolve(res.rows);
            } else {
                reject(err.message);
            }
        });
    });
}

async function deleteToken(token){
    return new Promise((resolve, reject) => {
        client.query(`DELETE FROM refresh_tokens WHERE token = '${token}'`, (err, res) => {
            if(!err) {
                resolve(res.rowCount);
            } else {
                reject(err.message);
            }
        });
    });
}

module.exports = {
    authenticateUser: authenticateUser,
    createToken: createToken,
    checkToken: checkToken,
    deleteToken: deleteToken
}