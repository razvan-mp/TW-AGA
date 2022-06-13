const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "Awards",
  insecureAuth: true
});

connection.connect()

module.exports = connection;