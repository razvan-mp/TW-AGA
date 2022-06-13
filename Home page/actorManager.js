let actorList = []
const requestURL = "http://localhost:5000/api/awards"
// const XMLHttpRequest = require('xhr2');


let xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", requestURL, true); // true for asynchronous
xmlHttp.send();

xmlHttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        actorList = JSON.parse(xmlHttp.responseText)
        const actorsSection = document.getElementById('actors')
        actorList.length = 100
        console.log(actorList)
        for (let actor in actorList) {
            if (actorList[actor]["Name"] !== '' && actorList[actor]["Name"] !== 'Name') {
                actorsSection.innerHTML += "<li>\n" +
                    "            <figure>\n" +
                    "                <img src=\"https://images.unsplash.com/photo-1471421298428-1513ab720a8e\" alt=\"Ceva\">\n" +
                    "                <figcaption><h3>" + actorList[actor]["Name"].toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ') + "</h3></figcaption>\n" +
                    "            </figure>\n" +
                    "                <div class='is-pulled-left'>\n" +
                    "                    <p><b>Year: </b>" + actorList[actor]["Year"].split(' ')[0] + "</p>\n" +
                    "                    <p><b>Category: </b>" + actorList[actor]["Category"].charAt(1) + actorList[actor]["Category"].substring(2).toLowerCase() + "</p>\n" +
                    "                    <p><b>Show name: </b>" + actorList[actor]["Show_Name"].toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
                + "</p></div></li>"
            }
        }
    }
}

