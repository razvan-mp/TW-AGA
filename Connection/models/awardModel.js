
const awards = require('../dataTest/actorsTest')
const {v4: uuidv4} = require('uuid')

const {writeDataToFile} = require('../utils')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(awards)
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const award = awards.find((p) => p.id === id)
        resolve(award)
    })
}

function create(award) {
    return new Promise((resolve, reject) => {
        const newAward = {id: uuidv4(), ...award}
        awards.push(newAward)
        writeDataToFile('Connection/dataTest/actorsTest.json', awards)
        resolve(newAward)
    })
}

function update(id, award) {
    return new Promise((resolve, reject) => {
        const index = awards.findIndex((p) =>p.id === id)
        awards[index] = {id, ...award}

        writeDataToFile('Connection/dataTest/actorsTest.json', awards)
        resolve(awards[index])
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update
}