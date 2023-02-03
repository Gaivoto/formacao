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

async function getCompra(id) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [User_Course] WHERE [id] = @id`;
        pool.input('id', sql.VarChar(200), id).query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function getAllCompras() {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [User_Course]`;
        pool.query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function getAllComprasByUser(id) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT c.id as id, c.name as name, c.category as category, c.description as description, c.image as image, uc.progress as progress, u.id as idCr, u.name as nameCr, u.image as imageCr, uc.date_bought as dateBought FROM [User_Course] uc LEFT JOIN [Course] c ON uc.id_course = c.id LEFT JOIN [Users] u ON c.id_creator = u.id WHERE uc.id_user = @id AND c.state = 'Ativo'`;
        pool.input('id', sql.VarChar(200), id).query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function existsCompra(idU, idC) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [User_Course] WHERE [id_user] = @idU AND [id_course] = @idC`;
        pool.input('idU', sql.VarChar(200), idU).input('idC', sql.VarChar(200), idC).query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function createCompra(id, body, currentDate) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `INSERT INTO User_Course (id, id_user, id_course, date_bought, progress) VALUES (@id, @idU, @idC, @cD, 0)`;
        pool.input('id', sql.VarChar(200), id).input('idU', sql.VarChar(200), body.id_user).input('idC', sql.VarChar(200), body.id_course).input('cD', sql.DateTime, currentDate).query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function getUsersThatBoughtThisCourse(id_course) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [User_Course] WHERE [id_course] = @idC`;
        pool.input('idC', sql.VarChar(200), id_course).query(slct, (err, res) => {
            if (!err) {
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