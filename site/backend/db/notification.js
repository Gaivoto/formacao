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
        const slct = `SELECT n.[id], n.[date], n.[id_user], n.[id_course], n.[id_video], n.[state], n.[change_state], c.[name] AS course_name FROM Notification n INNER JOIN [Course] c  ON n.[id_course] = c.[id] WHERE n.[id_user] = @id;`;
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
        const updt = `UPDATE [Notification] SET [state] = 'true' WHERE [id_user] = @id AND [state] = 'false'`;
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
            insrt = `INSERT INTO [Notification] ([id],[date] ,[id_user] ,[id_course] ,[id_video] ,[state], [change_state]) VALUES (@id, @date, @idU, @idC, null, 'false', @change_state)`;
        }
        else {
            insrt = `INSERT INTO [Notification] ([id],[date] ,[id_user] ,[id_course] ,[id_video] ,[state], [change_state]) VALUES (@id, @date, @idU, @idC, @idV, 'false', @change_state)`;
        }
        pool.input('id', sql.VarChar(200), notif.id).input('date', sql.DateTime, notif.date).input('idU', sql.VarChar(100), notif.id_user).input('idC', sql.VarChar(100), notif.id_course).input('idV', sql.VarChar(100), notif.id_video).input('change_state', sql.VarChar(50), notif.change_state).query(insrt, (err, res) => {
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