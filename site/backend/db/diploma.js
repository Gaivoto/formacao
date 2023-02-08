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

async function getUserDiplomas(id) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT c.id as id, c.name as course, c.category as category, uc.date_finished as date, cr.name as creator FROM [Course] c LEFT JOIN [User_Course] uc ON c.id = uc.id_course LEFT JOIN [Users] u ON uc.id_user = u.id LEFT JOIN [Users] cr ON c.id_creator = cr.id WHERE u.id = @id AND uc.progress = 100`;

        pool.input('id', sql.VarChar(200), id).query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

module.exports = {
    getUserDiplomas: getUserDiplomas
}