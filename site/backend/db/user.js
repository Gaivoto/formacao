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

async function getAllUsers() {
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [Users] where [type] = 'user`;
        pool.query(slct, (err, res) => {
            if(!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function getUser(id) {
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [Users] WHERE [id] = '${id}'`;
        pool.query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function updateUser(user, id) {
    return new Promise((resolve, reject) => {
        const updt = `UPDATE [Users] SET [name] = '${user.name}', [description] = '${user.description}', [image] = '${user.image}' WHERE id = '${id}' AND [type] = 'user`;
        pool.query(updt, (err, res) => {
            if (!err) {
                resolve(res);
            } else {
                reject(err.message);
            }
        });
    });
}

async function createUser(id, user) {
    return new Promise((resolve, reject) => {
        const insrt = `INSERT INTO [Users] ([id], [username], [password], [type], [name], [email], [description], [image], [state]) 
        VALUES ('${id}', '${user.username}', '${user.password}', 'user', '${user.name}', '', '', '', 'Ativo')`;
        pool.query(insrt, (err, res) => {
            if (!err) {
                resolve(res);
            } else {
                reject(err.message);
            }
        });
    });
}

async function isUsernameTaken(username) {
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [Users] WHERE [username] = '${username}'`;
        pool.query(slct, (err,res) => {
            if(!err) {
                resolve(res.recordset);
            } else {
                reject(err.message)
            }
        });
    });
}

async function getAllIDs() {
    return new Promise((resolve, reject) => {
        const slct = `SELECT [id] FROM [Users]`;
        pool.query(slct, (err,res) => {
            if(!err) {
                resolve(res.recordset);
            } else {
                reject(err.message)
            }
        });
    });
}

async function changeUserState(state, id) {
    return new Promise((resolve, reject) => {
        const updt = `UPDATE [Users] SET [state] = '${state}' WHERE [id] = '${id}' AND [type] = 'user`;
        pool.query(updt, (err, res) => {
            if(!err) {
                resolve(res);
            } else {
                reject(err.message);
            }
        });
    });
}

module.exports = {
    updateUser: updateUser,
    createUser: createUser,
    isUsernameTaken: isUsernameTaken,
    changeUserState: changeUserState,
    getAllUsers: getAllUsers,
    getUser: getUser,
    getAllIDs: getAllIDs
}
