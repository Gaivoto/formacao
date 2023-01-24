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

async function getAllUsers() {
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [Users]`;
        pool.query(slct, (err, res) => {
            if(!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function selectUserById(id) {
    return new Promise((resolve, reject) => {
        if (isNaN(Number(id))) {
            res.send(err);
        }
        const slct = `SELECT [id], [username], [name], [description], [type], [price], [image] FROM [Users] WHERE [id] = '${id}'`;
        pool.query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function updateUser(user) {
    return new Promise((resolve, reject) => {
        const updt = `UPDATE [Users] SET [name] = '${user.name}', [description] = '${user.description}', [price] = ${user.price}, [image] = '${user.image}' WHERE id = '${user.id}'`;
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
        VALUES ('${id}', '${user.username}', '${user.password}', 'user', '${user.name}', '${user.email}', '${user.description}', '${user.image}', 'Ativo')`;
        pool.query(insrt, (err, res) => {
            if (!err) {
                resolve(res);
            } else {
                reject(err.message);
            }
        });
    });
}

async function selectUserByUsername(username) {
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM  [Users] WHERE [username] = '${username}'`;
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
        const updt = `UPDATE [Users] SET [state] = '${state}' WHERE [id] = '${id}'`;
        pool.query(updt, (err, res) => {
            if(!err) {
                resolve(res);
            } else {
                reject(err.message);
            }
        });
    });
}

async function isIDTaken(id) {
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [Users] WHERE [id] = '${id}'`;
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
    getAllUsers: getAllUsers,
    selectUserById: selectUserById,
    updateUser: updateUser,
    createUser: createUser,
    selectUserByUsername: selectUserByUsername,
    changeUserState: changeUserState,
    isIDTaken: isIDTaken
}
