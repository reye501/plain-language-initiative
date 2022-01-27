const mysql = require("mysql");

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '@MPmysql7112',
    database: 'pli_db'

})

export default db;