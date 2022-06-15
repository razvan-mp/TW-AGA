let actorList = []
const requestURL = "http://localhost:5000/api/awards"
const requestTMDBApi = "https://api.themoviedb.org/3/search/person?api_key=01d27a60012da6c4514d0865a5e025e3&query="
const imgPath = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2"

// const XMLHttpRequest = require('xhr2');

function showAllActors() {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", requestURL, true); // true for asynchronous
    xmlHttp.send();

    xmlHttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            actorList = JSON.parse(xmlHttp.responseText)
            const actorsSection = document.getElementById('actors')
            actorsSection.innerHTML = ''
            actorList.length = 100
            for (let actor in actorList) {
                if (actorList[actor]["Name"] !== '' && actorList[actor]["Name"] !== 'Name') {
                    let requestName = requestTMDBApi + actorList[actor]["Name"].replaceAll(" ", "%20") + "&page=1"

                    let htmlRequestTMDB = new XMLHttpRequest();
                    htmlRequestTMDB.open("GET", requestName, true);
                    htmlRequestTMDB.send();

                    htmlRequestTMDB.onreadystatechange = function () {
                        if (this.readyState === 4 && this.status === 200) {
                            let fullResponse = JSON.parse(htmlRequestTMDB.responseText)

                            let actorName = actorList[actor]["Name"].toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')
                            if (actorList[actor]["Won"] === "True\r")
                                actorName += ' 🏆'
                            let actorImageURL = imgPath + fullResponse['results'][0]['profile_path']
                            let awardYear = actorList[actor]["Year"].split(' ')[0]
                            let awardCategory = actorList[actor]["Category"].charAt(1) + actorList[actor]["Category"].substring(2).toLowerCase()
                            let showName = actorList[actor]["Show_Name"].toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')

                            actorsSection.innerHTML += "<li>\n" +
                                "            <figure>\n" +
                                "                <img class='crop' src='" + actorImageURL + "' alt='" + actorName + "'>\n" +
                                "                <figcaption><h3>" + actorName + "</h3></figcaption>\n" +
                                "            </figure>\n" +
                                "                <div class='is-pulled-left'>\n" +
                                "                    <p><b>Year: </b>" + awardYear + "</p>\n" +
                                "                    <p><b>Category: </b>" + awardCategory + "</p>\n" +
                                "                    <p><b>Show name: </b>" + showName
                            +"</p></div></li>"
                        }
                    }
                }
            }
        }
    }
}

function searchActor() {
    const requestURL = 'http://localhost:5000/api/awards/'
    let inputValue = document.getElementById('search').value;

    let htmlRequestTMDB = new XMLHttpRequest();
    htmlRequestTMDB.open('GET', requestURL + inputValue, true);
    htmlRequestTMDB.send();

    if (inputValue === '') {
        showAllActors()
    } else {
        htmlRequestTMDB.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                actorList = JSON.parse(htmlRequestTMDB.responseText)
                console.log(actorList[0])
                let actorSection = document.getElementById('actors')
                actorSection.innerHTML = ""
                actorList.length = 100
                for (let actor in actorList) {
                    let requestName = requestTMDBApi + actorList[actor]["Name"].replaceAll(" ", "%20") + "&page=1"
                    console.log(requestName)

                    let htmlRequestTMDB = new XMLHttpRequest();
                    htmlRequestTMDB.open("GET", requestName, true);
                    htmlRequestTMDB.send();
                    htmlRequestTMDB.onreadystatechange = function () {
                        if (this.readyState === 4 && this.status === 200) {
                            let fullResponse = JSON.parse(htmlRequestTMDB.responseText)
                            document.getElementById('actors').innerHTML += "<li>\n" +
                                "            <figure>\n" +
                                "                <img class='crop' src='" + imgPath + fullResponse['results'][0]['profile_path'] + "' alt='" + actorList[actor]['Name'] + "'>\n" +
                                "                <figcaption><h3>" + actorList[actor]["Name"].toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ') + "</h3></figcaption>\n" +
                                "            </figure>\n" +
                                "                <div class='is-pulled-left'>\n" +
                                "                    <p><b>Year: </b>" + actorList[actor]["Year"].split(' ')[0] + "</p>\n" +
                                "                    <p><b>Category: </b>" + actorList[actor]["Category"].charAt(1) + actorList[actor]["Category"].substring(2).toLowerCase() + "</p>\n" +
                                "                    <p><b>Show name: </b>" + actorList[actor]["Show_Name"].toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
                            +"</p></div></li>"
                        }
                    }
                }
            }
        }
    }

}
