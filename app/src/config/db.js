const mysql = require("mysql");

const db = mysql.createConnection({
    host: "lifeprof-db.cpnuttlspcjq.ap-northeast-2.rds.amazonaws.com",
    user: "warmars87",
    password: "lifeprof87",
    database: "AI_pose_db",
});

db.connect();
module.exports = db;