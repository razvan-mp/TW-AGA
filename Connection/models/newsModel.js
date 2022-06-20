const cheerio = require("cheerio");

baseYahooURL = "https://news.search.yahoo.com/search?p=";
baseTMZURL = "https://www.tmz.com/search/?q=";

function findYahooNews(actorName) {
    return new Promise((resolve, reject) => {
        let dict = [];

        let requestURL = ""

        requestURL += baseYahooURL + actorName;
        console.log(actorName)
        console.log(requestURL)

        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", encodeURI(requestURL), true);
        xmlHttp.send();

        xmlHttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let $ = cheerio.load(xmlHttp.responseText);

                let titles = [];
                let readMoreLink = [];
                let imageLinks = [];

                $("a.thmb").each(function (i, e) {
                    readMoreLink[i] = $(this).prop("href");
                });

                $("a.thmb").each(function (i, e) {
                    titles[i] = $(this).prop("title");
                });

                $("a.thmb img").each(function (i, e) {
                    const link = $(this).prop("src");

                    if (String(link).startsWith("https://s.yimg.com")) {
                        if (
                            titles[i] !== undefined &&
                            readMoreLink !== undefined &&
                            link !== undefined
                        ) {
                            let obj = {
                                title: titles[i],
                                readMoreLink: readMoreLink[i],
                                imageLink: link,
                            };
                            dict.push(obj);
                            resolve(dict);
                        }
                    }
                });
            }
            else resolve(dict)
        }
    })
}

function findTMZNews(actorName) {
    return new Promise((resolve, reject) => {
        let dict = [];

        let requestURL = ""

        requestURL += baseTMZURL + actorName;
        console.log(actorName)
        console.log(requestURL)

        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", encodeURI(requestURL), true);
        xmlHttp.send();

        xmlHttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let $ = cheerio.load(xmlHttp.responseText);

                let titles = [];
                let readMoreLink = [];
                let imageLinks = [];

                $(
                    "a.gridler__card-link.gridler__card-link--default.js-track-link.js-click-article"
                ).each(function (i) {
                    readMoreLink[i] = $(this).prop("href");
                });

                $("h4.gridler__card-title.gridler__card-title--default").each(function (
                    i
                ) {
                    titles[i] = String($(this).text()).trim();
                });

                $("img.img-fluid").each(function (i) {
                    imageLinks[i] = $(this).prop("src").replace("_sm", "_xl");
                });
                for (let i = 0; i < titles.length; i++) {
                    let obj = {
                        title: titles[i],
                        readMoreLink: readMoreLink[i],
                        imageLink: imageLinks[i],
                    };
                    dict.push(obj)
                }
                console.log(dict)
                resolve(dict)
            }
            else resolve(dict)
        }
    })
}

module.exports = {
    findYahooNews,
    findTMZNews
}
