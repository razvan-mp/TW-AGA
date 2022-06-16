let actorList = []
const requestURL = "http://localhost:5000/api/awards"
const movieRequestURL = "https://api.themoviedb.org/3/search/person?api_key=01d27a60012da6c4514d0865a5e025e3&query="
const imgPath = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2"

<<<<<<< HEAD
// const XMLHttpRequest = require('xhr2');
=======
function showAllActors() {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", requestURL, true);
    xmlHttp.send();

    xmlHttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            actorList = JSON.parse(xmlHttp.responseText)
            const actorsSection = document.getElementById('actors')
            const modalsSection = document.getElementById('modals')
            actorsSection.innerHTML = ''
            actorList.length = 100
            let lazy = 10
            for (let actor in actorList) {
                if (actorList[actor]["Name"] !== '' && actorList[actor]["Name"] !== 'Name') {
                    let requestName = movieRequestURL + actorList[actor]["Name"].replaceAll(" ", "%20") + "&page=1"

                    let requestMovies = new XMLHttpRequest();
                    requestMovies.open("GET", requestName, true);
                    requestMovies.send();

                    requestMovies.onreadystatechange = function () {
                        if (this.readyState === 4 && this.status === 200) {
                            let movieResponse = JSON.parse(requestMovies.responseText)

                            let actorName = actorList[actor]["Name"].toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')
                            if (actorList[actor]["Won"] === "True\r")
                                actorName += ' 🏆'
                            let actorImageURL = imgPath + movieResponse['results'][0]['profile_path']
                            let awardYear = actorList[actor]["Year"].split(' ')[0]
                            let awardCategory = actorList[actor]["Category"].charAt(1) + actorList[actor]["Category"].substring(2).toLowerCase()
                            let showName = actorList[actor]["Show_Name"].toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')

                            if (lazy > 0) {
                                actorsSection.innerHTML += "<li>\n" +
                                "            <figure class='popup-trigger' data-popup-trigger=\"" + actorName + "\">\n" +
                                "                <img class='crop' src='" + actorImageURL + "' alt=\"" + actorName + "\">\n" +
                                "                <figcaption><h3>" + actorName + "</h3></figcaption>\n" +
                                "            </figure>\n" +
                                "                <div class='is-pulled-left'>\n" +
                                "                    <p><b>Year: </b>" + awardYear + "</p>\n" +
                                "                    <p><b>Category: </b>" + awardCategory + "</p>\n" +
                                "                    <p><b>Show name: </b>" + showName
                                + "</p></div></li>"

                                lazy--
                            } else {
                                actorsSection.innerHTML += "<li>\n" +
                                "            <figure class='popup-trigger' data-popup-trigger=\"" + actorName + "\">\n" +
                                "                <img class='crop' src='img/placeholder.gif' data-src='" + actorImageURL + "' alt=\"" + actorName + "\">\n" +
                                "                <figcaption><h3>" + actorName + "</h3></figcaption>\n" +
                                "            </figure>\n" +
                                "                <div class='is-pulled-left'>\n" +
                                "                    <p><b>Year: </b>" + awardYear + "</p>\n" +
                                "                    <p><b>Category: </b>" + awardCategory + "</p>\n" +
                                "                    <p><b>Show name: </b>" + showName
                                + "</p></div></li>"
                            }

                            let personInfoURL = "https://api.themoviedb.org/3/person/"
                            let key = "?api_key=01d27a60012da6c4514d0865a5e025e3&language=en-US"

                            let requestPersonInfo = new XMLHttpRequest()
                            requestPersonInfo.open('GET', personInfoURL + movieResponse['results'][0]['id'] + key, true)
                            requestPersonInfo.send()

                            requestPersonInfo.onreadystatechange = function () {
                                if (this.readyState === 4 && this.status === 200) {
                                    let personResponse = JSON.parse(requestPersonInfo.responseText)

                                    let biography = personResponse['biography']
                                    let birthday = personResponse['birthday']
                                    let birthplace = personResponse['place_of_birth']
                                    let moviesPlayed = movieResponse['results'][0]['known_for']

                                    let movieList = ''

                                    if (moviesPlayed != undefined) {
                                        movieList += '<h3>Movies known for</h3>'
                                        for (let i = 0; i < moviesPlayed.length; i++) {
                                            movieList += '<h4>'
                                            if (moviesPlayed[i]['media_type'] === 'movie') {
                                                movieList += moviesPlayed[i]['title']
                                                movieList += ' (<em>'
                                                movieList += moviesPlayed[i]['release_date'].split('-')[0]
                                                movieList += '</em>)'
                                            } else if (moviesPlayed[i]['media_type'] === 'tv') {
                                                movieList += moviesPlayed[i]['name']
                                                movieList += ' (<em>'
                                                movieList += moviesPlayed[i]['first_air_date'].split('-')[0]
                                                movieList += '</em>)'
                                            }
                                            movieList += '</h4>'
                                            movieList += moviesPlayed[i]['overview']
                                        }
                                    }
>>>>>>> f0c178ec2f14fd6fa8bd759b77c06a2e751c5b1d

async function showAllActors() {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", requestURL, true); // true for asynchronous
    xmlHttp.send();

<<<<<<< HEAD
    xmlHttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            actorList = JSON.parse(xmlHttp.responseText)
            const actorsSection = document.getElementById('actors')
            const modalsSection = document.getElementById('modals')
            actorsSection.innerHTML = ''
            actorList.length = 100
            for (let actor in actorList) {
                if (actorList[actor]["Name"] !== '' && actorList[actor]["Name"] !== 'Name') {
                    let requestName = movieRequestURL + actorList[actor]["Name"].replaceAll(" ", "%20") + "&page=1"

                    let requestMovies = new XMLHttpRequest();
                    requestMovies.open("GET", requestName, true);
                    requestMovies.send();

                    requestMovies.onreadystatechange = function () {
                        if (this.readyState === 4 && this.status === 200) {
                            let movieResponse = JSON.parse(requestMovies.responseText)

                            let actorName = actorList[actor]["Name"].toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')
                            if (actorList[actor]["Won"] === "True\r")
                                actorName += ' 🏆'
                            let actorImageURL = imgPath + movieResponse['results'][0]['profile_path']
                            let awardYear = actorList[actor]["Year"].split(' ')[0]
                            let awardCategory = actorList[actor]["Category"].charAt(1) + actorList[actor]["Category"].substring(2).toLowerCase()
                            let showName = actorList[actor]["Show_Name"].toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')

                            actorsSection.innerHTML += "<li>\n" +
                                "            <figure class='popup-trigger' data-popup-trigger='" + actorName + "'>\n" +
                                "                <img class='crop' src='" + actorImageURL + "' alt='" + actorName + "'>\n" +
                                "                <figcaption><h3>" + actorName + "</h3></figcaption>\n" +
                                "            </figure>\n" +
                                "                <div class='is-pulled-left'>\n" +
                                "                    <p><b>Year: </b>" + awardYear + "</p>\n" +
                                "                    <p><b>Category: </b>" + awardCategory + "</p>\n" +
                                "                    <p><b>Show name: </b>" + showName
                                + "</p></div></li>"

                            let personInfoURL = "https://api.themoviedb.org/3/person/"
                            let key = "?api_key=01d27a60012da6c4514d0865a5e025e3&language=en-US"

                            let requestPersonInfo = new XMLHttpRequest()
                            requestPersonInfo.open('GET', personInfoURL + movieResponse['results'][0]['id'] + key, true)
                            requestPersonInfo.send()

                            requestPersonInfo.onreadystatechange = function () {
                                if (this.readyState === 4 && this.status === 200) {
                                    let personResponse = JSON.parse(requestPersonInfo.responseText)

                                    let biography = personResponse['biography']
                                    let birthday = personResponse['birthday']
                                    let birthplace = personResponse['place_of_birth']
                                    let moviesPlayed = movieResponse['results'][0]['known_for']
                                    console.log(moviesPlayed[0]['title'])
                                    let movieList = ''

                                    for (let i = 0; i < moviesPlayed.length; i++) {
                                        movieList += '<h4>'
                                        movieList += moviesPlayed[i]['title']
                                        movieList += ' (<em>'
                                        movieList += moviesPlayed[i]['release_date'].split('-')[0]
                                        movieList += '</em>)'
                                        movieList += '</h4>'
                                        movieList += moviesPlayed[i]['overview']
                                    }

                                    modalsSection.innerHTML += "    <div class='popup-modal' data-popup-modal='" + actorName + "'>\n" +
                                        "        <i class='popup-modal__close'></i>\n" +
                                        "        <h1>\n" +
                                        actorName +
                                        "        </h1>\n" +
                                        "<h3>Biography</h3>" +
                                        biography +
                                        "<h3>Birthday</h3>" +
                                        birthday +
                                        "<h3>Birth place</h3>" +
                                        birthplace +
                                        "<h3>Movies known for</h3>" +
                                        movieList +
                                        "    </div>"

                                    const modalTriggers = document.querySelectorAll('.popup-trigger')
                                    const modalCloseTrigger = document.querySelector('.popup-modal__close')
                                    const bodyBlackout = document.querySelector('.body-blackout')

                                    modalTriggers.forEach(trigger => {
                                        trigger.addEventListener('click', () => {
                                            const {popupTrigger} = trigger.dataset
                                            const popupModal = document.querySelector(`[data-popup-modal="${popupTrigger}"]`)

                                            popupModal.classList.add('is--visible')
                                            bodyBlackout.classList.add('is-blacked-out')

                                            popupModal.querySelector('.popup-modal__close').addEventListener('click', () => {
                                                popupModal.classList.remove('is--visible')
                                                bodyBlackout.classList.remove('is-blacked-out')
                                            })

                                            bodyBlackout.addEventListener('click', () => {
                                                popupModal.classList.remove('is--visible')
                                                bodyBlackout.classList.remove('is-blacked-out')
                                            })
                                        })
                                        console.log('added event listener')
=======
                                    modalsSection.innerHTML += "    <div class='popup-modal' data-popup-modal=\"" + actorName + "\">\n" +
                                        "        <i class='popup-modal__close'></i>\n" +
                                        "        <h1>\n" +
                                        actorName +
                                        "        </h1>\n" +
                                        "<h3>Biography</h3>" +
                                        biography +
                                        "<h3>Birthday</h3>" +
                                        birthday +
                                        "<h3>Birth place</h3>" +
                                        birthplace +
                                        movieList +
                                        "    </div>"

                                    let trigger = document.querySelector(`[data-popup-trigger="${actorName}"]`)
                                    trigger.addEventListener('click', () => {
                                        let popupModal = document.querySelector(`[data-popup-modal="${actorName}"]`)

                                        popupModal.classList.add('is--visible')
                                        document.querySelector('.body-blackout').classList.add('is-blacked-out')

                                        popupModal.querySelector('.popup-modal__close').addEventListener('click', () => {
                                            popupModal.classList.remove('is--visible')
                                            document.querySelector('.body-blackout').classList.remove('is-blacked-out')
                                        })

                                        document.querySelector('.body-blackout').addEventListener('click', () => {
                                            popupModal.classList.remove('is--visible')
                                            document.querySelector('.body-blackout').classList.remove('is-blacked-out')
                                        })
>>>>>>> f0c178ec2f14fd6fa8bd759b77c06a2e751c5b1d
                                    })
                                }
                            }
                        }
                    }
                }
<<<<<<< HEAD
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
                actorList.length = 5
                for (let actor in actorList) {
                    let requestName = movieRequestURL + actorList[actor]["Name"].replaceAll(" ", "%20") + "&page=1"
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
=======
>>>>>>> f0c178ec2f14fd6fa8bd759b77c06a2e751c5b1d
            }
        }
    }
}

showAllActors()

function searchActor() {
    const requestURL = 'http://localhost:5000/api/awards/'
    let inputValue = document.getElementById('search').value.toLowerCase();
    console.log("numele actorului: " + inputValue)

    let htmlRequestTMDB = new XMLHttpRequest();
    htmlRequestTMDB.open('GET', requestURL + inputValue, true);
    htmlRequestTMDB.send();

    if (inputValue === '') {
        window.location.replace('index.html')
    } else {
        const modalsSection = document.getElementById('modals')
        htmlRequestTMDB.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                actorList = JSON.parse(htmlRequestTMDB.responseText)
                let actorSection = document.getElementById('actors')
                actorSection.innerHTML = ""
                actorList.length = 100
                for (let actor in actorList) {
                    let requestName = movieRequestURL + actorList[actor]["Name"].replaceAll(" ", "%20") + "&page=1"

                    let htmlRequestTMDB = new XMLHttpRequest();
                    htmlRequestTMDB.open("GET", requestName, true);
                    htmlRequestTMDB.send();
                    htmlRequestTMDB.onreadystatechange = function () {
                        if (this.readyState === 4 && this.status === 200) {
                            let movieResponse = JSON.parse(htmlRequestTMDB.responseText)

                            let actorName = actorList[actor]["Name"].toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')
                            if (actorList[actor]["Won"] === "True\r")
                                actorName += ' 🏆'
                            let actorImageURL = imgPath + movieResponse['results'][0]['profile_path']
                            let awardYear = actorList[actor]["Year"].split(' ')[0]
                            let awardCategory = actorList[actor]["Category"].charAt(1) + actorList[actor]["Category"].substring(2).toLowerCase()
                            let showName = actorList[actor]["Show_Name"].toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')

                            document.getElementById('actors').innerHTML += "<li>\n" +
                                "            <figure class='popup-trigger' data-popup-trigger=\"" + actorName + "\">\n" +
                                "                <img class='crop' src='" + actorImageURL + "' alt=\"" + actorName + "\">\n" +
                                "                <figcaption><h3>" + actorName + "</h3></figcaption>\n" +
                                "            </figure>\n" +
                                "                <div class='is-pulled-left'>\n" +
                                "                    <p><b>Year: </b>" + awardYear + "</p>\n" +
                                "                    <p><b>Category: </b>" + awardCategory + "</p>\n" +
                                "                    <p><b>Show name: </b>" + showName
                                + "</p></div></li>"

                            let personInfoURL = "https://api.themoviedb.org/3/person/"
                            let key = "?api_key=01d27a60012da6c4514d0865a5e025e3&language=en-US"

                            let requestPersonInfo = new XMLHttpRequest()
                            requestPersonInfo.open('GET', personInfoURL + movieResponse['results'][0]['id'] + key, true)
                            requestPersonInfo.send()

                            requestPersonInfo.onreadystatechange = function () {
                                if (this.readyState === 4 && this.status === 200) {
                                    let personResponse = JSON.parse(requestPersonInfo.responseText)

                                    let biography = personResponse['biography']
                                    let birthday = personResponse['birthday']
                                    let birthplace = personResponse['place_of_birth']
                                    let moviesPlayed = movieResponse['results'][0]['known_for']

                                    let movieList = ''

                                    if (moviesPlayed != undefined) {
                                        movieList += '<h3>Movies known for</h3>'
                                        for (let i = 0; i < moviesPlayed.length; i++) {
                                            movieList += '<h4>'
                                            if (moviesPlayed[i]['media_type'] === 'movie') {
                                                movieList += moviesPlayed[i]['title']
                                                movieList += ' (<em>'
                                                movieList += moviesPlayed[i]['release_date'].split('-')[0]
                                                movieList += '</em>)'
                                            } else if (moviesPlayed[i]['media_type'] === 'tv') {
                                                movieList += moviesPlayed[i]['name']
                                                movieList += ' (<em>'
                                                movieList += moviesPlayed[i]['first_air_date'].split('-')[0]
                                                movieList += '</em>)'
                                            }
                                            movieList += '</h4>'
                                            movieList += moviesPlayed[i]['overview']
                                        }
                                    }


                                    modalsSection.innerHTML += "    <div class='popup-modal' data-popup-modal=\"" + actorName + "\">\n" +
                                        "        <i class='popup-modal__close'></i>\n" +
                                        "        <h1>\n" +
                                        actorName +
                                        "        </h1>\n" +
                                        "<h3>Biography</h3>" +
                                        biography +
                                        "<h3>Birthday</h3>" +
                                        birthday +
                                        "<h3>Birth place</h3>" +
                                        birthplace +
                                        movieList +
                                        "    </div>"

                                    let trigger = document.querySelector(`[data-popup-trigger="${actorName}"]`)
                                    trigger.addEventListener('click', () => {
                                        let popupModal = document.querySelector(`[data-popup-modal="${actorName}"]`)

                                        popupModal.classList.add('is--visible')
                                        document.querySelector('.body-blackout').classList.add('is-blacked-out')

                                        popupModal.querySelector('.popup-modal__close').addEventListener('click', () => {
                                            popupModal.classList.remove('is--visible')
                                            document.querySelector('.body-blackout').classList.remove('is-blacked-out')
                                        })

                                        document.querySelector('.body-blackout').addEventListener('click', () => {
                                            popupModal.classList.remove('is--visible')
                                            document.querySelector('.body-blackout').classList.remove('is-blacked-out')
                                        })
                                    })
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function isVisible(elem) {
    let coords = elem.getBoundingClientRect()

    let windowHeight = document.documentElement.clientHeight
    let topVisible = coords.top > 0 && coords.top < windowHeight

    let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0

    return topVisible || bottomVisible
}

function showVisible() {
    for (let img of document.querySelectorAll('img')) {
        let realSrc = img.dataset.src
        if (!realSrc) continue

        if (isVisible(img)) {
            img.src = realSrc
            img.dataset.src = ''
        }
    }
}

window.addEventListener('scroll', showVisible)