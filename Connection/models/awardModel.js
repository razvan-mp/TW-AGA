// const awards = require('../dataTest/actorsTest')
const connection = require('../database/db')


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
};
