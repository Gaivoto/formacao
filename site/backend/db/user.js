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

async function getAllUsers() {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT id, username, type, name, email, description, image, state FROM [Users] where [type] = 'user'`;
        pool.query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                console.log("bruh")
                reject(err.message);
            }
        });
    });
}

async function getUser(id) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT id, username, type, name, email, description, price, image, state FROM [Users] WHERE [id] = @id`;
        pool.input('id', sql.VarChar(200), id).query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message);
            }
        });
    });
}

async function updateUser(user, id) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const updt = `UPDATE [Users] SET [name] = @name, [description] = @description, [image] = @image WHERE id = @id AND [type] = 'user'`;
        pool.input('id', sql.VarChar(200), id).input('name', sql.VarChar(50), user.name).input('description', sql.VarChar(200), user.description).input('image', sql.VarChar(50), user.image).query(updt, (err, res) => {
            if (!err) {
                resolve(res);
            } else {
                reject(err.message);
            }
        });
    });
}

async function createUser(id, user) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const insrt = `INSERT INTO [Users] ([id], [username], [password], [type], [name], [email], [description], [image], [state]) 
        VALUES (@id, @username, @password, 'user', @name, '', '', '', 'Ativo')`;
        pool.input('id', sql.VarChar(200), id).input('username', sql.VarChar(50), user.username).input('password', sql.VarChar(200), user.password).input('name', sql.VarChar(50), user.name).query(insrt, (err, res) => {
            if (!err) {
                resolve(res);
            } else {
                reject(err.message);
            }
        });
    });
}

async function isUsernameTaken(username) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT * FROM [Users] WHERE [username] = @username`;
        pool.input('username', sql.VarChar(50), username).query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message)
            }
        });
    });
}

async function getAllIDs() {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const slct = `SELECT [id] FROM [Users]`;
        pool.query(slct, (err, res) => {
            if (!err) {
                resolve(res.recordset);
            } else {
                reject(err.message)
            }
        });
    });
}

async function changeUserState(state, id) {
    const pool = new sql.Request();
    return new Promise((resolve, reject) => {
        const updt = `UPDATE [Users] SET [state] = @state WHERE [id] = @id AND [type] = 'user'`;
        pool.input('id', sql.VarChar(200), id).input('state', sql.VarChar(50), state).query(updt, (err, res) => {
            if (!err) {
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
