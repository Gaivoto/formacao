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

async function getVideo(id) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [Video] WHERE [id] = @id`;
        pool.input('id', sql.VarChar(200), id).query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function getAllVideosFromCourse(id) {
    //console.log('bruh', id)
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [Video] WHERE [id_course] = @id ORDER BY [position] ASC`;
        pool.input('id', sql.VarChar(200), id).query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function createVideo(id, body) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `INSERT INTO Video (id, title, video, state, duration, image, description, date, id_course, position) VALUES (@id, @title, @video, 'Pendente', @duration, @image, @description, @date, @idC, @position)`;
        pool.input('id', sql.VarChar(200), id).input('title', sql.VarChar(50), body.title).input('video', sql.VarChar(50), body.video).input('state', sql.VarChar(50), body.state).input('duration', sql.BigInt, body.duration).input('image', sql.VarChar(50), body.image).input('description', sql.VarChar(200), body.description).input('date', sql.DateTime, body.date).input('idC', sql.VarChar(100), body.id_course).input('position', sql.BigInt, body.position).query(slct, (err, res) => {

            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function isTitleTaken(title) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [Video] WHERE [title] = @title`;
        pool.input('title', sql.VarChar(50), title).query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function updateStateVideo(id, state) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        let slct = `UPDATE Video SET [state] = @state WHERE [id] = @id`;
        pool.input('id', sql.VarChar(200), id).input('state', sql.VarChar(50), state).query(slct, (err, res) => {
            if (!err) {
                resolve(res);
            } else {
                reject(err.message);
            }
        });
    });
}

async function isVideoFromCourse(idV, idC) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [Video] WHERE [id] = @id AND [id_course] = @idC`;
        pool.input('id', sql.VarChar(200), idV).input('idC', sql.VarChar(100), idC).query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function updateVideo(body) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        slct = `UPDATE Video SET [title] = @title, [video] = @video, [duration] = @duration, [image] = @image, [description] = @description  WHERE [id] = @id`;
        pool.input('id', sql.VarChar(200), id).input('title', sql.VarChar(50), body.title).input('video', sql.VarChar(50), body.video).input('duration', sql.BigInt, body.duration).input('image', sql.VarChar(50), body.image).input('description', sql.VarChar(200), body.description).query(slct, (err, res) => {
            if (!err) {
                resolve(res);
            } else {
                reject(err.message);
            }
        });
    });
}

async function isCourseFromUser(idC, idU) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [Course] WHERE [id] = @id AND [id_creator] = @idCreator`;
        pool.input('id', sql.VarChar(200), idC).input('idCreator', sql.VarChar(200), idU).query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

module.exports = {
    getVideo: getVideo,
    getAllVideosFromCourse: getAllVideosFromCourse,
    createVideo: createVideo,
    isTitleTaken: isTitleTaken,
    updateStateVideo: updateStateVideo,
    isVideoFromCourse: isVideoFromCourse,
    updateVideo: updateVideo,
    isCourseFromUser: isCourseFromUser,
}