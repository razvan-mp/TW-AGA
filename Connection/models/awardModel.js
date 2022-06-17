// const awards = require('../dataTest/actorsTest')
const connection = require("../database/db");
const mysql = require("mysql");

// const {v4: uuidv4} = require('uuid')

// const {writeDataToFile} = require('../utils')

// function findAll() {
//     return new Promise((resolve, reject) => {
//         resolve(awards)
//     })
// }

// function findById(id) {
//     return new Promise((resolve, reject) => {
//         const award = awards.find((p) => p.id === id)
//         resolve(award)
//     })
// }

// function create(award) {
//     return new Promise((resolve, reject) => {
//         const newAward = {id: uuidv4(), ...award}
//         awards.push(newAward)
//         writeDataToFile('Connection/dataTest/actorsTest.json', awards)
//         resolve(newAward)
//     })
// }

// function update(id, award) {
//     return new Promise((resolve, reject) => {
//         const index = awards.findIndex((p) =>p.id === id)
//         awards[index] = {id, ...award}

//         writeDataToFile('Connection/dataTest/actorsTest.json', awards)
//         resolve(awards[index])
//     })
// }

function findIfIsInTopByName(name) {
    return new Promise((resolve, reject) => {
        // TODO
    });
}

function findActors() {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT DISTINCT NAME FROM Awards.ScreenActorGuildAwards WHERE Name <> '';",
            function (err, result, fields) {
                if (err) throw err;
                resolve(result);
            }
        );
    });
}

function findTopActors() {
    return new Promise((resolve, reject) => {
        let sql = "SELECT NAME, COUNT(*) As total, sum(case when Won = 'True\\r' then 1 else 0 end) As WonCount FROM " +
            "awards.ScreenActorGuildAwards GROUP BY NAME HAVING NAME <> '' ORDER BY sum(case when Won = 'True\\r' then " +
            "1 else 0 end) DESC LIMIT 0, 10;"
        connection.query(sql, function (err, result, fields) {
                if (err) throw err;
                resolve(result);
            }
        );
    });
}

// Prevent SQL Injection
function findYearsOfAwardsByActor(name) {
    return new Promise((resolve, reject) => {
        let sql =
            "SELECT NAME, CAST(LEFT(YEAR, 4) AS SIGNED) AS Year, COUNT(*) AS NumberOfAwards FROM Awards.ScreenActorGuildAwards WHERE Won = 'True' GROUP BY NAME, YEAR HAVING NAME = ?";
        const inserts = [name];
        sql = mysql.format(sql, inserts);
        connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            resolve(result);
        });
    });
}

function findByName(name) {
    return new Promise((resolve, reject) => {
        name = name.trimStart();
        let sql = "SELECT * FROM ScreenActorGuildAwards WHERE NAME LIKE ? OR NAME LIKE ?";
        const inserts = [name + '%', "% " + name + "%"];
        sql = mysql.format(sql, inserts);
        connection.query(
            sql, function (err, result, fields) {
                if (err) throw err;
                resolve(result);
            }
        );
    });
}

function findAll() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM ScreenActorGuildAwards", function (err, result, fields) {
            if (err)
                throw err;
            resolve(result);
        });
    });
}

function findAllStats() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT SUBSTRING_INDEX(YEAR, ' ', 1) AS YEAR, COUNT(*) AS TOTAL, SUM(CASE WHEN WON='True\\r' THEN 1 ELSE 0 END) AS WINS, SUM(CASE WHEN WON='False\\r' THEN 1 ELSE 0 END) AS LOSSES FROM awards.screenactorguildawards GROUP BY YEAR HAVING YEAR LIKE '%-%'", function (err, result, fields) {
            if (err)
                throw err
            resolve(result)
        })
    })
}

module.exports = {
    findTopActors,
    findYearsOfAwardsByActor,
    findActors,
    findAll,
    findByName,
    findAllStats
};
