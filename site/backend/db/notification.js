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

async function getAllNotifFromUser(id) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [Notification] WHERE [id_user] = @id`;
        pool.input('id', sql.VarChar(200), id).query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function updateNotifFromUser(id) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const updt = `UPDATE [Notification] SET [state] = 1 WHERE [id_user] = @id AND [state] = 0`;
        pool.input('id', sql.VarChar(200), id).query(updt, (err, res) => {
            if (!err) {
                resolve(res);
            } else {
                reject(err.message);
            }
        })
    })
}

async function createNotification(notif) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        let insrt = "";
        if (notif.id_video == null) {
            insrt = `INSERT INTO [Notification] ([id] ,[message] ,[date] ,[id_user] ,[id_course] ,[id_video] ,[state]) VALUES (@id, @message, @date, @idU, @idC, null, 0)`;
        }
        else {
            insrt = `INSERT INTO [Notification] ([id] ,[message] ,[date] ,[id_user] ,[id_course] ,[id_video] ,[state]) VALUES (@id, @message, @date, @idU, @idC, @idV, 0)`;
        }
        pool.input('id', sql.VarChar(200), notif.id).input('message', sql.VarChar(200), notif.message).input('date', sql.DateTime, notif.date).input('idU', sql.VarChar(100), notif.id_user).input('idC', sql.VarChar(100), notif.id_course).input('idV', sql.VarChar(100), notif.id_video).query(insrt, (err, res) => {
            if (!err) {
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