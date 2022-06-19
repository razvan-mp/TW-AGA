const cheerio = require("cheerio");

baseURL = "https://news.search.yahoo.com/search?p=";

function findNews(actorName) {
    return new Promise((resolve, reject) => {
        let dict = [];

        let requestURL = ""

        requestURL += baseURL + actorName;
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


module.exports = {
    findNews
}
