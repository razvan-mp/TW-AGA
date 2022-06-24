const pg = require("pg");

const connectionString = "postgres://ysdxpuushergpw:90aac33ad610e22ef9723399d1107258db5948d848ed4d5bb3ef60a1211a9d3a@ec2-54-228-32-29.eu-west-1.compute.amazonaws.com:5432/d14p9i6cr53t33";
const pgClient = new pg.Client(connectionString);
pgClient.connect()

module.exports = pgClient;