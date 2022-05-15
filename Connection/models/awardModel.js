
const actors = require('../dataTest/actorsTest')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(actors)
    })
}

module.exports = {
    findAll
}