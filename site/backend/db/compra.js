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

async function getAllComprasByUser(id) {
    return new Promise((resolve, reject) => {
        const slct = `SELECT c.id as id, c.name as name, c.category as category, c.description as description, c.image as image, u.id as idCr, u.name as nameCr, u.image as imageCr, uc.date_bought as dateBought FROM [User_Course] uc LEFT JOIN [Course] c ON uc.id_course = c.id LEFT JOIN [Users] u ON c.id_creator = u.id WHERE [id_user] = '${id}'`;
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

async function getUsersThatBoughtThisCourse(id_course) {
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [User_Course] WHERE [id_course] = ${id_course}`;
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
    getAllComprasByUser: getAllComprasByUser,
    existsCompra: existsCompra,
    createCompra: createCompra,
    getUsersThatBoughtThisCourse: getUsersThatBoughtThisCourse
}