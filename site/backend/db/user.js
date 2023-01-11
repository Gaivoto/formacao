const sql = require("mssql");

const config = {
    user: 'sa',
    password: 'letbren3',
    server: 'localhost',
    database: 'projeto_discord',
    trustServerCertificate: true,
    encrypt: true
};

sql.connect(config, function (err) {
    if (err) throw err;
    console.log("Connected!");
});

const pool = new sql.Request();


/*

async function getUser(){
    try {
        let pool = await sql.connect(client)
        let result1 = await pool.request().query('select * from users')
        console.log(result1)
        sql.close()
    } catch (error) {
        console.log(err.message)
        sql.close()
    }

}

//getUser()

async function createUser(user){
    
    return new Promise((resolve, reject) => {
        client.query(`INSERT INTO utilizadores (id, username, password, type, email, image, description, country, price, state) VALUES ('${user.id}', '${user.username}', '${user.password}', '${user.type}', '${user.email}', '${user.image}', '${user.description}', '${user.country}', '${user.price}', '${user.state}')`, (err, res) => {
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
    //createUser: createUser,
    getUser: getUser,

}*/