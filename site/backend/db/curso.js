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


async function getCurso(id) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        let slct = `SELECT c.id, c.name, c.category, c.description, c.date, c.state, c.price, c.image, c.id_creator, c.rating, u.name AS creatorName, u.image AS creatorImage FROM [Course] c INNER JOIN Users u ON c.id_creator = u.id WHERE c.id = @id`
        pool.input('id', sql.VarChar(200), id).query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                console.log(err);
                reject(err.message);
            }
        });
    });
}

async function getAllCursos() {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT c.id as id, c.name as name, c.description as description, c.state as state, c.category as category, c.image as image, c.date as date, c.price as price, c.rating as rating, u.id as idCr, u.image as imageCr, u.name as nameCr FROM [Course] c LEFT JOIN [Users] u ON c.id_creator = u.id WHERE c.state = 'Ativo'`;
        pool.query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function getAllCursosAdm() {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT c.id as id, c.name as name, c.description as description, c.state as state, c.category as category, c.image as image, c.date as date, c.price as price, c.rating as rating, u.id as idCr, u.image as imageCr, u.name as nameCr FROM [Course] c LEFT JOIN [Users] u ON c.id_creator = u.id`;
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
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT c.id as id_course, c.name as course, c.category as category, c.description as description, c.state as state, c.image as image, c.date as date, u.id as idCr, u.name as nameCr, u.image as imageCr FROM [Course] c LEFT JOIN [Users] u ON c.id_creator = u.id WHERE [id_creator] = @id`;
        pool.input('id', sql.VarChar(200), id).query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function getCursosByCriadorForSubbedUser(id) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT c.id as id, c.name as name, c.category as category, c.description as description, c.state as state, c.image as image, c.date as date, u.id as idCr, u.name as nameCr, u.image as imageCr FROM [Course] c LEFT JOIN [Users] u ON c.id_creator = u.id WHERE [id_creator] = @id`;
        pool.input('id', sql.VarChar(200), id).query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function createCurso(id, body) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `INSERT INTO Course (id, name, category, description, date, state, price, image, id_creator, rating)
         VALUES (@id, @name, @category, @description, @date, 'Pendente', @price, @image, @id_creator, 0)`;
        pool.input('id', sql.VarChar(200), id).input('name', sql.VarChar(50), body.name).input('category', sql.VarChar(50), body.category).input('description', sql.VarChar(200), body.description).input('date', sql.DateTime, body.date).input('price', sql.Float, body.price).input('image', sql.VarChar(50), body.image).input('id_creator', sql.VarChar(200), body.id_creator).query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function updateStateCurso(id, state) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {

        let slct = `UPDATE Course SET [state] = @state WHERE [id] = @id`;

        pool.input('state', sql.VarChar(50), state).input('id', sql.VarChar(200), id).query(slct, (err, res) => {
            if (!err) {
                resolve(res);
            } else {
                reject(err.message);
            }
        });
    });
}

async function updateCurso(body) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {

        slct = `UPDATE Course SET [name] = @name, [category] = @category, [description] = @description, [price] = @price, [image] = @image  WHERE [id] = id`;

        pool.input('name', sql.VarChar(50), body.name).input('category', sql.VarChar(50), body.category).input('description', sql.VarChar(200), body.description).input('price', sql.Float, body.price).input('image', sql.VarChar(50), body.image).input('id', sql.VarChar(200), body.id).query(slct, (err, res) => {
            if (!err) {
                resolve(res);
            } else {
                reject(err.message);
            }
        });
    });
}

async function getUserCourses(id) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT c.id as id_course, c.name as course, c.image as image, uc.progress as progress FROM [Course] c LEFT JOIN [User_Course] uc ON c.id = uc.id_course LEFT JOIN [Users] u ON uc.id_user = u.id WHERE u.id = @id`;
        pool.input('id', sql.VarChar(200), id).query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function isCourseFromUser(idC, idU) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [Course] WHERE [id] = @idC' AND [id_creator] = @idU`;
        pool.input('idC', sql.VarChar(200), idC).input('idU', sql.VarChar(200), idU).query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function isNameTaken(name) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [Course] WHERE [name] = @name`;
        pool.input('name', sql.VarChar(200), name).query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function getMostRecentCursos() {
    const pool = new sql.Request();
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
    const pool = new sql.Request();
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
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT TOP 6 COUNT(uc.id_course) AS pointsCursos, c.id as id, c.name as name, c.category as category, c.description as deescription, c.date as date, c.state as state, c.price as price, c.image as image, u.id as idCr, u.name as nameCr, u.image as imageCr
        FROM User_Course uc 
        INNER JOIN Course c 
        ON uc.id_course = c.id 
        INNER JOIN Users u 
        ON c.id_creator = u.id
        WHERE c.state = 'Ativo' AND uc.date_bought > @data
        GROUP BY c.id, c.name, c.category, c.description, c.date, c.state, c.price, c.image, u.id, u.name, u.image
        ORDER BY pointsCursos DESC`;
        pool.input('data', sql.DateTime, data).query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function getRecomendedCursos() {
    const pool = new sql.Request();
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
    const pool = new sql.Request();
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
    getAllCursosAdm: getAllCursosAdm,
    getCursosByCriador: getCursosByCriador,
    getCursosByCriadorForSubbedUser: getCursosByCriadorForSubbedUser,
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