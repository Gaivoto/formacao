const express = require('express');
const app = express();

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

async function getUserDiplomas(id) {
    return new Promise((resolve, reject) => {
        const slct = `SELECT c.id as id_course, c.name as course, c.image as image FROM [Course] c LEFT JOIN [User_Course] uc ON c.id = uc.id_course LEFT JOIN [Users] u ON uc.id_user = u.id WHERE u.id = '${id}' AND uc.progress = 100`;
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
    getUserDiplomas: getUserDiplomas
}