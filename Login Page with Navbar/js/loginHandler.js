const signUpURL = "http://localhost:5000/api/auth/register"
const logInURL = "http://localhost:5000/api/auth/login"

const delay = ms => new Promise(res => setTimeout(res, ms));

function handleSignUp() {
    const form = document.getElementById('sign-up-form');
    const username = form.elements['name'].value
    const email = form.elements['email'].value
    const password = form.elements['password'].value

    let userInfo = []
    userInfo.push({"username": username, "email": email, "password": password})
    
    let request = new XMLHttpRequest();
    request.open("POST", signUpURL, true)
    request.send(JSON.stringify(userInfo))
}

async function handleLogIn() {
    const form = document.getElementById('log-in-form')
    const email = form.elements['email'].value
    const password = form.elements['password'].value

    let userInfo = []
    userInfo.push({"email": email, "password": password})

    let request = new XMLHttpRequest();
    request.open("POST", logInURL, true)
    request.send(JSON.stringify(userInfo))
    request.onreadystatechange = async function () {
        console.log(this.readyState + " " + this.status)
        if (this.readyState === 4 && this.status === 200) {
            let jwt = parseJwt(request.responseText)
            setCookie("jwt", request.responseText, 10)
            setCookie("tmz", jwt["tmz"])
            setCookie("yahoo", jwt["yahoo"])
            setCookie("category_01", jwt["category_01"])
            setCookie("category_02", jwt["category_02"])
            setCookie("category_03", jwt["category_03"])
            setCookie("category_04", jwt["category_04"])
            setCookie("category_05", jwt["category_05"])
        } else if (this.readyState === 4 && this.status === 401) {
            const formText = document.getElementById('log-in-form').innerHTML
            document.getElementById('log-in-form').innerHTML += "<p style='color: red;'>Wrong email/password combination!</p>"
            await delay(3000)
            document.getElementById('log-in-form').innerHTML = formText
            setCookie("jwt", '', 10)
        } else if (this.readyState === 4 && this.status === 418) {
            const formText = document.getElementById('log-in-form').innerHTML
            document.getElementById('log-in-form').innerHTML += "<p style='color: red;'>User does not exist!</p>"
            await delay(3000)
            document.getElementById('log-in-form').innerHTML = formText
            setCookie("jwt", '', 10)
        }
    }
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    console.log(document.cookie)
}

function parseJwt (token) {
    const base64 = token.split('.')[1].replace(new RegExp('/-/g'), '+').replace(new RegExp('/-/g'), '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};