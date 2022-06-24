const {Client} = require('pg');

const connection = new Client({
    host: "ec2-54-228-32-29.eu-west-1.compute.amazonaws.com",
    user: "ysdxpuushergpw",
    password: "90aac33ad610e22ef9723399d1107258db5948d848ed4d5bb3ef60a1211a9d3a",
    database: "d14p9i6cr53t33",
    port: "5432",
    dialect: "postgres",
    ssl: {
        rejectUnauthorized: false
    }
})

connection.connect();

module.exports = connection;