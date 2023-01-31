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

async function getCurso(id) {
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [Course] WHERE [id] = '${id}'`;
        pool.query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function getAllCursos() {
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [Course]`;
        pool.query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function getCursosByCriador(id) {
    return new Promise((resolve, reject) => {
        const slct = `SELECT c.id as id, c.name as name, c.category as category, c.description as description, c.image as image, u.id as idCr, u.name as nameCr, u.image as imageCr FROM [Course] c LEFT JOIN [Users] u ON c.id_creator = u.id WHERE [id_creator] = '${id}'`;
        pool.query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function createCurso(id, body) {
    return new Promise((resolve, reject) => {
        const slct = `INSERT INTO Course (id, name, category, description, date, state, price, image, id_creator, rating) VALUES ('${id}', '${body.name}', '${body.category}', '${body.description}', '${body.date}', 'Pendente', ${body.price}, '${body.image}', '${body.id_creator}', 0)`;
        pool.query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function updateStateCurso(body) {
    return new Promise((resolve, reject) => {

        let slct = `UPDATE Course SET [state] = '${body.state}' WHERE [id] = '${body.id}'`;

        pool.query(slct, (err, res) => {
            if (!err) {
                resolve(res);
            } else {
                reject(err.message);
            }
        });
    });
}

async function updateCurso(body) {
    return new Promise((resolve, reject) => {

        slct = `UPDATE Course SET [name] = '${body.name}', [category] = '${body.category}', [description] = '${body.description}', [price] = ${body.price}, [image] = '${body.image}'  WHERE [id] = '${body.id}'`;

        pool.query(slct, (err, res) => {
            if (!err) {
                resolve(res);
            } else {
                reject(err.message);
            }
        });
    });
}

async function getUserCourses(id) {
    return new Promise((resolve, reject) => {
        const slct = `SELECT c.id as id_course, c.name as course, c.image as image, uc.progress as progress FROM [Course] c LEFT JOIN [User_Course] uc ON c.id = uc.id_course LEFT JOIN [Users] u ON uc.id_user = u.id WHERE u.id = '${id}'`;
        pool.query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function isCourseFromUser(idC, idU) {
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [Course] WHERE [id] = '${idC}' AND [id_creator] = '${idU}'`;
        pool.query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function isNameTaken(name) {
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [Course] WHERE [name] = '${name}'`;
        pool.query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function getMostRecentCursos() {
    return new Promise((resolve, reject) => {
        const slct = `SELECT TOP 6 c.id AS id, c.name AS name, c.category AS category, c.description AS description, c.date AS date, c.price AS price, c.image AS image, c.id_creator AS idCr, u.name AS nameCr, u.image AS imageCr 
            FROM Course c LEFT JOIN Users u on c.id_creator = u.id WHERE c.state = 'Ativo' ORDER BY c.date desc`;
        pool.query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function getMostSoldCursos() {
    return new Promise((resolve, reject) => {
        const slct = `SELECT TOP 6 c.id as id, c.name as name, c.category as category, c.description as deescription, c.date as date, c.state as state, c.price as price, c.image as image, u.id as idCr, u.name as nameCr, u.image as imageCr, count(uc.id) as vendas
        FROM Course c LEFT JOIN User_Course uc on uc.id_course = c.id LEFT JOIN Users u on c.id_creator = u.id
        WHERE c.state = 'Ativo'
        GROUP BY c.id, c.name, c.category, c.description, c.date, c.state, c.price, c.image, u.id, u.name, u.image
        ORDER BY vendas desc`;
        pool.query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function getDestaquesCursos(data) {
    return new Promise((resolve, reject) => {
        const slct = `SELECT TOP 6 COUNT(uc.id_course) AS pointsCursos, c.id as id, c.name as name, c.category as category, c.description as deescription, c.date as date, c.state as state, c.price as price, c.image as image, u.id as idCr, u.name as nameCr, u.image as imageCr
        FROM User_Course uc 
        INNER JOIN Course c 
        ON uc.id_course = c.id 
        INNER JOIN Users u 
        ON c.id_creator = u.id
        WHERE c.state = 'Ativo' AND uc.date_bought > '${data}'
        GROUP BY c.id, c.name, c.category, c.description, c.date, c.state, c.price, c.image, u.id, u.name, u.image
        ORDER BY pointsCursos DESC`;
        pool.query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function getRecomendedCursos() {
    return new Promise((resolve, reject) => {
        const slct = `SELECT TOP 6 c.id as id, c.name as name, c.category as category, c.description as description, c.date as date, c.price as price, c.image as image, c.id_creator as idCr, u.name as nameCr, u.image as imageCr FROM Course c
        LEFT JOIN Users u on c.id_creator = u.id WHERE c.state = 'Ativo' ORDER BY newid()`;
        pool.query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function getOtherCursos() {
    return new Promise((resolve, reject) => {
        const slct = `SELECT TOP 6 c.id as id, c.name as name, c.category as category, c.description as description, c.date as date, c.price as price, c.image as image, c.id_creator as idCr, u.name as nameCr, u.image as imageCr FROM Course c
        LEFT JOIN Users u on c.id_creator = u.id WHERE c.state = 'Ativo' ORDER BY newid()`;
        pool.query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

module.exports = {
    getCurso: getCurso,
    getAllCursos: getAllCursos,
    getCursosByCriador: getCursosByCriador,
    createCurso: createCurso,
    updateStateCurso: updateStateCurso,
    updateCurso: updateCurso,
    getUserCourses: getUserCourses,
    isCourseFromUser: isCourseFromUser,
    isNameTaken: isNameTaken,
    getMostRecentCursos: getMostRecentCursos,
    getMostSoldCursos: getMostSoldCursos,
    getDestaquesCursos: getDestaquesCursos,
    getRecomendedCursos: getRecomendedCursos,
    getOtherCursos: getOtherCursos,
}