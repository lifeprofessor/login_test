const mysql = require("mysql");

// .env파일을 활용해 환경변수 설정 후 로드해 사용
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_DATABASE,
});

db.connect();
module.exports = db;