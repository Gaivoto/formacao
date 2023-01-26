const jwt = require('jsonwebtoken');
const crypto = require('crypto-js');
const bcrypt = require('bcrypt');

const dbAuth = require('../db/auth.js');
const dbUser = require('../db/user');

async function login(username, password) {
    return new Promise((resolve, reject) => {
        if (username == "" || password == "") {
            reject({ code: 400, message: 'Username ou password vazios.' });
        } else {
            dbAuth.authenticateUser(username, password).then(async value => {
                try {
                    if (await bcrypt.compare(password, value[0].password)) {
                        if (value.length == 0) {
                            reject({ code: 401, error: { message: 'Utilizador/password inválido.' } });
                        } else if (value[0].state == "Inativo") {
                            reject({ code: 401, error: { message: 'Utilizador está inativo.' } });
                        } else {
                            let user = { id: value[0].id, username: value[0].username, type: value[0].type, type: value[0].type };
                            let access_token = jwt.sign(user, process.env.ACCESS_SECRET, { expiresIn: '240m' });
                            let refresh_token = jwt.sign(user, process.env.REFRESH_SECRET);
                            dbAuth.createToken(crypto.SHA256(refresh_token, process.env.CRYPTO_KEY).toString()).then(value => {
                                resolve({ code: 201, info: { user: user, access_token: access_token, refresh_token: refresh_token } });
                            })
                                .catch(error => {
                                    console.log(error);
                                    reject({ code: 400, message: 'Algo correu mal com a query.' });
                                });
                        }
                    } else {
                        reject({ code: 400, error: { message: 'Username ou password inválido.' } });
                    }
                } catch {
                    reject({ code: 400, message: 'Algo correu mal com a query.' });
                }
            })
                .catch(error => {
                    console.log(error);
                    reject({ code: 400, error: { message: 'Algo correu mal com a query.' } });
                });
        }
    });
}

async function logout(refresh_token) {
    console.log(crypto.SHA256(refresh_token, process.env.CRYPTO_KEY).toString())
    return new Promise((resolve, reject) => {
        dbAuth.deleteToken(crypto.SHA256(refresh_token, process.env.CRYPTO_KEY).toString()).then(value => {
            if (value.rowsAffected[0] == 0) {
                reject({ code: 401, error: { message: 'Token inválido.' } });
            } else {
                resolve({ code: 200 });
            }
        })
            .catch(error => {
                reject({ code: 400, error: { message: 'Algo correu mal com a query.' } });
                console.log(error);
            });
    });
}

module.exports = {
    login: login,
    logout: logout
}