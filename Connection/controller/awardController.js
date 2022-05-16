const Actors = require('../models/awardModel')

const { getPostData } = require('../utils')

// @desc Gets all awards
// @route GET /api/products
async function getAwards(req, res) {
    try {
        const actors = await Actors.findAll()

        res.writeHead(200, {'Content-Type' : 'application/json'})
        res.end(JSON.stringify(actors))
    } catch(error) {
        console.log(error)
    }
}

// @desc Gets single award
// @route GET /api/product/:id
async function getAward(req, res, id) {
    try {
        const actor = await Actors.findById(id)

        if(!actor) {
            res.writeHead(404, {'Content-Type' : 'application/json'})
            res.end(JSON.stringify({message: 'Award not found'}))
        } else {
            res.writeHead(200, {'Content-Type' : 'application/json'})
            res.end(JSON.stringify(actor))
        }

        
    } catch(error) {
        console.log(error)
    }
}

// @desc Create a Award
// @route POST /api/products
async function createAward(req, res) {
    try {
        const body = await getPostData(req)

        const {name, description} = JSON.parse(body)

        const award = {
            name,
            description
       }

        const newAward = await Actors.create(award)

        res.writeHead(201, {'Content-Type' : 'application/json'})
        return res.end(JSON.stringify(newAward))
      
    } catch(error) {
        console.log(error)
    }
}

module.exports = {
    getAwards,
    getAward,
    createAward
}