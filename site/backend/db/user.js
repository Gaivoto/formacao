const pg = require('pg');

const client = new pg.Client({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    port: process.env.DBPORT,
    password: process.env.DBPW,
    database: process.env.DBNAME
});

client.connect();

async function createUser(user){
    
    return new Promise((resolve, reject) => {
        client.query(`INSERT INTO utilizadores (id, username, password) VALUES ('${user.id}', '${user.username}', '${user.password}')`, (err, res) => {
            if(!err) {
                resolve(res.rows);
            } else {
                reject(err.message);
            }

            client.end;
        });
    });
}

module.exports = {
    createUser: createUser,
}