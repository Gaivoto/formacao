const pg = require('pg');

const client = new pg.Client({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    port: process.env.DBPORT,
    password: process.env.DBPW,
    database: process.env.DBNAME
});

client.connect();

async function authenticateUser(username, password){
    return new Promise((resolve, reject) => {
        client.query(`SELECT * FROM utilizadores WHERE username = '${username}' AND password = '${password}'`, (err, res) => {
            if(!err) {
                resolve(res.rows);
            } else {
                reject(err.message);
            }

            client.end;
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

            client.end;
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

            client.end;
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

            client.end;
        });
    });
}

module.exports = {
    authenticateUser: authenticateUser,
    createToken: createToken,
    checkToken: checkToken,
    deleteToken: deleteToken
}