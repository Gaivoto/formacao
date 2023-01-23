const jwt = require('jsonwebtoken');
const crypto = require('crypto-js');

const dbAuth = require('../db/auth.js');

async function login(username, password){
    return new Promise((resolve, reject) => {
        dbAuth.authenticateUser(username, password).then(value => {
            if(value.length == 0){  
                reject({code: 401, message: 'Utilizador/password inválido.'});
            } else {
                let user = {id: value[0].id, username: value[0].username, type: value[0].type, type: value[0].type};
                let access_token = jwt.sign(user, process.env.ACCESS_SECRET, {expiresIn: '180m'});
                let refresh_token = jwt.sign(user, process.env.REFRESH_SECRET);
                dbAuth.createToken(crypto.SHA256(refresh_token, process.env.CRYPTO_KEY).toString()).then(value => {
                    resolve({code: 201, user: user, access_token: access_token, refresh_token: refresh_token});
                    console.log(crypto.SHA256(refresh_token, process.env.CRYPTO_KEY).toString())
                })
                .catch(error => {
                    console.log(error);
                    reject({code: 400, message: 'Algo correu mal com a query.'});
                });
            }
        })
        .catch(error => {
            console.log(error);
            reject({code: 400, message: 'Algo correu mal com a query.'});
        });
    });
}

async function logout(refresh_token){
    console.log(crypto.SHA256(refresh_token, process.env.CRYPTO_KEY).toString())
    return new Promise((resolve, reject) => {
        dbAuth.deleteToken(crypto.SHA256(refresh_token, process.env.CRYPTO_KEY).toString()).then(value => {
            if(value.rowsAffected[0] == 0){
                reject({code: 401, message: 'Token inválido.'});
            } else {
                resolve({code: 200});
            }
        })
        .catch(error => reject({code: 400, message: 'Erro ao tentar concluir a operação!'}));
    });
}

module.exports = {
    login: login,
    logout: logout
}