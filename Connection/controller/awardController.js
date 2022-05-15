const Actors = require('../models/awardModel')

async function getAwards(req, res) {
    try {
        const actors = await Actors.findAll()

        res.writeHead(200, {'Content-Type' : 'application/json'})
        res.end(JSON.stringify(actors))
    } catch(error) {
        console.log(error)
    }
}

module.exports = {
    getAwards
}