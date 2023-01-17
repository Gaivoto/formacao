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

async function getAllVideos() {
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [Video]`;
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
            console.log(slct)
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

async function isIDTaken(id) {
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

module.exports = {
    getVideo: getVideo,
    getAllVideos: getAllVideos,
    createVideo: createVideo,
    isTitleTaken: isTitleTaken,
    isIDTaken: isIDTaken,
}