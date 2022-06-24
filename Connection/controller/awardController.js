const Awards = require('../models/awardModel')

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

async function getActorsByCategory(category, res) {
    res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    });
    try {
        const actors = await Awards.findActorsByCategory(category);
        res.writeHead(200, {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        })
        console.log(actors)
        res.end(JSON.stringify(actors))

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

module.exports = {
    getAwards,
    getActor,
    getTopActors,
    getAllTimeStats,
    getActorsByCategory
}