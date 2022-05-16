const http = require('http')
const { getAwards, getAward, createAward, updateAward } = require('./controller/awardController')


const server = http.createServer((req, res) => {
    if(req.url === '/api/actors' && req.method === 'GET') {
        getAwards(req, res)

    } else if(req.url.match(/\/api\/actors\/([0-9]+)/) && req.method === 'GET') {   
        const id = req.url.split('/')[3]
        getAward(req, res, id)
    } else if(req.url === '/api/actors' && req.method === 'POST') {
        createAward(req, res)
    } else if(req.url.match(/\/api\/actors\/([0-9]+)/) && req.method === 'PUT') {   
        const id = req.url.split('/')[3]
        updateAward(req, res, id)
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'Route not found'}))
    }
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))