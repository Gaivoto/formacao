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

async function getVideo(id) {
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [Video] WHERE [id] = '${id}'`;
        pool.query(slct, (err, res) => {
            if(!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function getAllVideosFromCourse(id) {
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [Video] WHERE [id_course] = '${id}'`;
        pool.query(slct, (err, res) => {
            if(!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function createVideo(id, body) {
    return new Promise((resolve, reject) => {
        const slct = `INSERT INTO Video (id, title, video, state, duration, image, description, date, id_course, position) VALUES ('${id}', '${body.title}', '${body.video}', 'Pendente', '${body.duration}', '${body.image}', '${body.description}', '${body.date}', '${body.id_course}', ${body.position})`;
        pool.query(slct, (err, res) => {
            
            if(!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function isTitleTaken(title) {
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [Video] WHERE [title] = '${title}'`;
        pool.query(slct, (err, res) => {
            if(!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function updateStateVideo(body) {
    return new Promise((resolve, reject) => {

        let slct = `UPDATE Video SET [state] = '${body.state}' WHERE [id] = '${body.id}'`;
        
        pool.query(slct, (err, res) => {
            if(!err) {
                resolve(res);
            } else {
                reject(err.message);
            }
        });
    });
}

async function isVideoFromCourse(idV, idC) {
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [Video] WHERE [id] = '${idV}' AND [id_course] = '${idC}'`;
        pool.query(slct, (err, res) => {
            if(!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function updateVideo(body) {
    return new Promise((resolve, reject) => {

        slct = `UPDATE Video SET [title] = '${body.title}', [video] = '${body.video}', [duration] = ${body.duration}, [image] = '${body.image}', [description] = '${body.description}'  WHERE [id] = '${body.id}'`;

        pool.query(slct, (err, res) => {
            if(!err) {
                resolve(res);
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
    getVideo: getVideo,
    getAllVideosFromCourse: getAllVideosFromCourse,
    createVideo: createVideo,
    isTitleTaken: isTitleTaken,
    updateStateVideo: updateStateVideo,
    isVideoFromCourse: isVideoFromCourse,
    updateVideo: updateVideo,
    isCourseFromUser: isCourseFromUser,
}