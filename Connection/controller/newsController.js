const News = require('../models/newsModel')
const Awards = require("../models/awardModel");

async function getNews(req, res) {
    res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    });
    try {
        const actors = await Awards.findRandomActors();
        let actorList = JSON.parse(JSON.stringify(actors));

        let dict = []
        for (let i = 0; i < actorList.length; i++) {
            let news = await News.findNews(actorList[i]["name"])
            dict.push(news)
        }

        res.writeHead(200, {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        })
        console.log(dict)
        res.end(JSON.stringify(dict))

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getNews
}