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

async function getUser(id) {
    return new Promise((resolve, reject) => {

        if(isNaN(Number(id))) {
            res.send(err)
        }

        const slct = `SELECT * FROM [Users] WHERE [id] = ${id}`;

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
    //createUser: createUser,
    getUser: getUser

}
