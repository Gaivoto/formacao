const express = require('express');
const app = express();

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