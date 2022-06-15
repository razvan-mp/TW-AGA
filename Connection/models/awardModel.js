// const awards = require('../dataTest/actorsTest')
const connection = require('../database/db')
const mysql = require('mysql')


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
    // Daca trebuie facem
  });
}

function findActors() {
  return new Promise((resolve, reject) => {
    connection.query("SELECT DISTINCT NAME FROM Awards.ScreenActorGuildAwards WHERE Name <> '';", function (err, result, fields) {
      if (err) 
        throw err;
      resolve(result);
      });
    });
}

function findTopActors() {
  return new Promise((resolve, reject) => {
    connection.query("SELECT NAME, COUNT(*) As NumberOfAwards FROM Awards.ScreenActorGuildAwards WHERE Won = 'True' GROUP BY NAME HAVING NAME <> '' ORDER BY COUNT(*) DESC LIMIT 0, 10;", function (err, result, fields) {
      if (err) 
        throw err;
      resolve(result);
      });
    });
}

function findTopActors() {
  return new Promise((resolve, reject) => {
    connection.query("SELECT NAME, COUNT(*) As NumberOfAwards FROM Awards.ScreenActorGuildAwards WHERE Won = 'True' GROUP BY NAME HAVING NAME <> '' ORDER BY COUNT(*) DESC LIMIT 0, 10;", function (err, result, fields) {
      if (err) 
        throw err;
      resolve(result);
      });
    });
}

// Prevent SQL Injection
function findYearsOfAwardsByActor(name) {
  return new Promise((resolve, reject) => {
    var sql = "SELECT NAME, CAST(LEFT(YEAR, 4) AS SIGNED) AS Year, COUNT(*) AS NumberOfAwards FROM Awards.ScreenActorGuildAwards WHERE Won = 'True' GROUP BY NAME, YEAR HAVING NAME = ?";
    var inserts = [name];
    sql = mysql.format(sql, inserts)
    connection.query(sql, function (err, result, fields) {
      if (err) 
        throw err;
      resolve(result);
      });
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

module.exports = {
  // findAll,
  // findById,
  // create,
  // update,
  findAll,
  findTopActors,
  findYearsOfAwardsByActor,
  findActors
};
