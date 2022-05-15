const http = require('http')
const { getAwards } = require('./controller/awardController')


const server = http.createServer((req, res) => {
    if(req.url === '/api/actors' && req.method === 'GET') {
        getAwards(req, res)
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'Route not found'}))
    }
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))