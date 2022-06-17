const Awards = require('../models/awardModel')

// const { getPostData } = require('../utils')

// @desc Gets all awards
// @route GET /api/awards
// async function getAwards(req, res) {
//     try {
//         const awards = await Awards.findAll()

//         res.writeHead(200, {'Content-Type' : 'application/json'})
//         res.end(JSON.stringify(awards))
//     } catch(error) {
//         console.log(error)
//     }
// }

// // @desc Gets single award
// // @route GET /api/awards/:id
// async function getAward(req, res, id) {
//     try {
//         const award = await Awards.findById(id)

//         if(!award) {
//             res.writeHead(404, {'Content-Type' : 'application/json'})
//             res.end(JSON.stringify({message: 'Award not found'}))
//         } else {
//             res.writeHead(200, {'Content-Type' : 'application/json'})
//             res.end(JSON.stringify(award))
//         }


//     } catch(error) {
//         console.log(error)
//     }
// }

// // @desc Create a Award
// // @route POST /api/awards
// async function createAward(req, res) {
//     try {
//         const body = await getPostData(req)

//         const {name, description} = JSON.parse(body)

//         const award = {
//             name,
//             description
//        }

//         const newAward = await Awards.create(award)

//         res.writeHead(201, {'Content-Type' : 'application/json'})
//         return res.end(JSON.stringify(newAward))

//     } catch(error) {
//         console.log(error)
//     }
// }

// // @desc Update a Award
// // @route PUT /api/awards/:id
// async function updateAward(req, res, id) {
//     try {
//         const award = await Awards.findById(id)
//
//         if(!award) {
//             res.writeHead(404, {'Content-Type' : 'application/json'})
//             res.end(JSON.stringify({message: 'Award not found'}))
//         } else {
//
//             const body = await getPostData(req)
//
//             const {name, description} = JSON.parse(body)
//
//             const awardData = {
//                 name: name || award.name,
//                 description: description || award.description
//             }
//
//             const updAward = await Awards.update(id, awardData)
//
//             res.writeHead(200, {'Content-Type' : 'application/json'})
//             return res.end(JSON.stringify(updAward))
//         }


//     } catch(error) {
//         console.log(error)
//     }
// }

// @desc Gets list actors
// @route GET /api/actors
async function getActors(req, res) {
    res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    });
    try {
        const actors = await Awards.findActors()

        res.writeHead(200, {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        })
        res.end(JSON.stringify(actors))

    } catch (error) {
        console.log(error)
    }
}

// @desc Gets list of top actors
// @route GET /api/topActors
async function getTopActors(req, res) {
    res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    });
    try {
        const actors = await Awards.findTopActors()

        res.writeHead(200, {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        })
        res.end(JSON.stringify(actors))

    } catch (error) {
        console.log(error)
    }
}

// @desc Gets list of years
// @route GET /api/yearsOfAwards
async function getYearsOfAwardsByActor(req, res, name) {
    res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    });
    try {
        const years = await Awards.findYearsOfAwardsByActor(name)

        res.writeHead(200, {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        })
        res.end(JSON.stringify(years))

    } catch (error) {
        console.log(error)
    }
}

// @desc Get an award from MySQL
// @route PUT /api/awards
async function getAwards(req, res) {
    res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    });
    try {
        const awards = await Awards.findAll()

        res.writeHead(200, {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        })
        res.end(JSON.stringify(awards))
    } catch (error) {
        console.log(error)
    }
}

// @desc Get an award from MySQL
// @route PUT /api/award/{name}
async function getActor(actorName, res) {
    res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    });

    try {
        const award = await Awards.findByName(actorName)

        res.writeHead(200, {
            'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        })
        res.end(JSON.stringify(award))
    } catch (error) {
        console.log(error)
    }
}

async function getAllTimeStats(req, res) {
    res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    })

    try {
        const stats = await Awards.findAllStats();

        res.writeHead(200, {
            'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        })
        res.end(JSON.stringify(stats))
    } catch (error) {
        console.log(error)
    }
}

// @desc Gets single award
// @route GET /api/mostawarded
// async function getIfIsInTop(req, res, name) {
//     try {
//         const isInTop = await Awards.findIfIsInTopByName(name)

//         if(!isInTop) {
//             res.writeHead(404, {'Content-Type' : 'application/json'})
//             res.end(JSON.stringify({message: 'Award not found'}))
//         } else {
//             res.writeHead(200, {'Content-Type' : 'application/json'})
//             res.end(JSON.stringify(isInTop))
//         }

//     } catch(error) {
//         console.log(error)
//     }
// }

module.exports = {
    // getAwards,
    // getAward,
    // createAward,
    // updateAward,
    getAwards,
    getActor,
    getTopActors,
    getAllTimeStats
    // getIfIsInTop
}