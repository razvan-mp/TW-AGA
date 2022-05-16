const Awards = require('../models/awardModel')

const { getPostData } = require('../utils')

// @desc Gets all awards
// @route GET /api/awards
async function getAwards(req, res) {
    try {
        const awards = await Awards.findAll()

        res.writeHead(200, {'Content-Type' : 'application/json'})
        res.end(JSON.stringify(awards))
    } catch(error) {
        console.log(error)
    }
}

// @desc Gets single award
// @route GET /api/awards/:id
async function getAward(req, res, id) {
    try {
        const award = await Awards.findById(id)

        if(!award) {
            res.writeHead(404, {'Content-Type' : 'application/json'})
            res.end(JSON.stringify({message: 'Award not found'}))
        } else {
            res.writeHead(200, {'Content-Type' : 'application/json'})
            res.end(JSON.stringify(award))
        }

        
    } catch(error) {
        console.log(error)
    }
}

// @desc Create a Award
// @route POST /api/awards
async function createAward(req, res) {
    try {
        const body = await getPostData(req)

        const {name, description} = JSON.parse(body)

        const award = {
            name,
            description
       }

        const newAward = await Awards.create(award)

        res.writeHead(201, {'Content-Type' : 'application/json'})
        return res.end(JSON.stringify(newAward))
      
    } catch(error) {
        console.log(error)
    }
}

// @desc Update a Award
// @route PUT /api/awards/:id
async function updateAward(req, res, id) {
    try {
        const award = await Awards.findById(id)

        if(!award) {
            res.writeHead(404, {'Content-Type' : 'application/json'})
            res.end(JSON.stringify({message: 'Award not found'}))
        } else {
           
            const body = await getPostData(req)

            const {name, description} = JSON.parse(body)

            const awardData = {
                name: name || award.name,
                description: description || award.description
            }

            const updAward = await Awards.update(id, awardData)

            res.writeHead(200, {'Content-Type' : 'application/json'})
            return res.end(JSON.stringify(updAward)) 
        }

      
    } catch(error) {
        console.log(error)
    }
}

module.exports = {
    getAwards,
    getAward,
    createAward,
    updateAward
}