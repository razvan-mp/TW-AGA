
const actors = require('../dataTest/actorsTest')
const {v4: uuidv4} = require('uuid')

const {writeDataToFile} = require('../utils')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(actors)
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const award = actors.find((p) => p.id === id)
        resolve(award)
    })
}

function create(award) {
    return new Promise((resolve, reject) => {
        const newAward = {id: uuidv4(), ...award}
        actors.push(newAward)
        writeDataToFile('Connection/dataTest/actorsTest.json', actors)
        resolve(newAward)
    })
}

module.exports = {
    findAll,
    findById,
    create
}