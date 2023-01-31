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

async function getAllNotifFromUser(id) {
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [Notification] WHERE [id_user] = '${id}'`;
        pool.query(slct, (err, res) => {
            if(!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function updateNotifFromUser(id) {
    return new Promise((resolve, reject) => {
        const updt = `UPDATE [Notification] SET [state] = 1 WHERE [id_user] = '${id}' AND [state] = 0`;
        pool.query(updt, (err, res) => {
            if(!err) {
                resolve(res);
            } else {
                reject(err.message);
            }
        })
    })
}

async function createNotification(notif) {
    return new Promise((resolve, reject) => {
        let insrt = "";
        if(notif.id_video == null) {
            insrt = `INSERT INTO [Notification] ([id] ,[message] ,[date] ,[id_user] ,[id_course] ,[id_video] ,[state]) VALUES ('${notif.id}', '${notif.message}', '${notif.date}', '${notif.id_user}', '${notif.id_course}', null, 0)`;
        }
        else {
            insrt = `INSERT INTO [Notification] ([id] ,[message] ,[date] ,[id_user] ,[id_course] ,[id_video] ,[state]) VALUES ('${notif.id}', '${notif.message}', '${notif.date}', '${notif.id_user}', '${notif.id_course}', '${notif.id_video}', 0)`;
        }
        pool.query(insrt, (err, res) => {
            if(!err) {
                resolve(res);
            } else {
                reject(err.message);
            }
        })
    })
}

module.exports = {
    getAllNotifFromUser: getAllNotifFromUser,
    updateNotifFromUser: updateNotifFromUser,
    createNotification: createNotification
}