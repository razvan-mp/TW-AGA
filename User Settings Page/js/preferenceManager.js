const prefsURL = "http://localhost:5000/api/preference"

function setPreference(id) {
    const value = getCookie(id)
    const jwt = getCookie("jwt")

    let response = []
    response.push({"jwt": jwt, "preference": id, "value": value})

    let request = new XMLHttpRequest();
    request.open("POST", prefsURL, true)
    request.send(JSON.stringify(response))
}