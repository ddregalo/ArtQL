require('dotenv').config()
const pgPromise = require('pg-promise');

const pgp = pgPromise({});

const config = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
};

const db = pgp(config);

// Example Query
// db.one('select * from users')
//     .then(res => {
//         console.log(res);
//     });

exports.db = db;