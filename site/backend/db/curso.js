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

async function getCurso(id) {
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [Course] WHERE [id] = '${id}'`;
        pool.query(slct, (err, res) => {
            if(!err) {
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
            if(!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function createCurso(id, body) {
    return new Promise((resolve, reject) => {

        const slct = `INSERT INTO Course (id, name, category, description, date, state, price, image, id_creator, rating) VALUES ('${id}', '${body.name}', '${body.category}', '${body.description}', '${body.date}', '${body.state}', ${body.price}, '${body.image}', '${body.id_creator}', 0)`;
        pool.query(slct, (err, res) => {
            if(!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function removeCurso(body) {
    return new Promise((resolve, reject) => {

        let id = body.id;
        let state = body.state;
        let slct

        slct = `UPDATE Course SET [state] = '${state}' WHERE [id] = '${id}'`;
        
        pool.query(slct, (err, res) => {
            if(!err) {
                resolve(res);
            } else {
                reject(err.message);
            }
        });
    });
}

async function updateCurso(body) {
    return new Promise((resolve, reject) => {

        let id = body.id;
        let name = body.name;
        let category = body.category;
        let description = body.description;
        let price = body.price;
        let image = body.image;
        

        if(id !== null || name !== null || category !== null || description !== null || price !== null || image !== null) {
            slct = `UPDATE Course SET [name] = '${name}', [category] = '${category}', [description] = '${description}', [price] = ${price}, [image] = '${image}'  WHERE [id] = '${id}'`;
        } else {
            reject({ code: 401, message: "Query has empty fields" })
        }

        pool.query(slct, (err, res) => {
            if(!err) {
                resolve(res);
            } else {
                reject(err.message);
            }
        });
    });
}

async function getUserCourses(id) {
    return new Promise((resolve, reject) => {
        const slct = `SELECT c.id, c.name, c.category, c.description, c.price, c.id_creator, (SELECT name FROM Users WHERE id = c.id_creator) AS nome_creator FROM Course c INNER JOIN User_Course uc ON c.id = uc.id_course INNER JOIN Users u ON uc.id_user = u.id WHERE u.id = '${id}'`;
        pool.query(slct, (err, res) => {
            if(!err) {
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
            if(!err) {
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
    createCurso: createCurso,
    removeCurso: removeCurso,
    updateCurso: updateCurso,
    getUserCourses: getUserCourses,
    isCourseFromUser: isCourseFromUser,
}