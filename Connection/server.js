const http = require('http')
const { getAwards, getTopActors, getYearsOfAwardsByActor, getActors, getAward, createAward, updateAward, getActor } = require('./controller/awardController')

const server = http.createServer((req, res) => {

    // if(req.url === '/api/awards' && req.method === 'GET') {
    //     getAwards(req, res)

    // } else if(req.url.match(/\/api\/awards\/([0-9]+)/) && req.method === 'GET') {   
    //     const id = req.url.split('/')[3]
    //     getAward(req, res, id)
    // } else if(req.url === '/api/awards' && req.method === 'POST') {
    //     createAward(req, res)
    // } else if(req.url.match(/\/api\/awards\/([0-9]+)/) && req.method === 'PUT') {   
    //     const id = req.url.split('/')[3]
    //     updateAward(req, res, id)
    // } else
    if(req.url === '/api/awards' && req.method === 'GET'){
        getAwards(req, res).then(r => { 
            return r 
        })
    } else if(req.url.match("\/api\/yearsOfAwards\/([a-z .]+)")  &&  req.method === 'GET') {  
        const name = req.url.split('/')[3].replace("%20", " ")
        getYearsOfAwardsByActor(req, res, name).then(r => { 
            return r 
        })
    
    } else if(req.url === '/api/topActors' &&  req.method === 'GET') {   
        getTopActors(req, res).then(r => { 
            return r 
        })
    
    } else if(req.url === '/api/actors' &&  req.method === 'GET') {   
        getActors(req, res).then(r => { 
            return r 
        })
    
    }  else if (req.url === '/api/awards' && req.method === 'GET') {
        getAwards(req, res).then(r => {
            return r
        })

    }else if (req.url.match("\/api\/awards\/([a-z .]+)") && req.method === 'GET') {
        let actorName = req.url.split('/')[3]
        getActor(actorName.replaceAll("'", "\\'").replaceAll('%20', ' '), res).then(r => {
            return r
        })
    }
    else {
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'Route not found'}))
    }

})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))