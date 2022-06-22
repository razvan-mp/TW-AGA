const signUpURL = "http://localhost:5000/api/auth/register"
const logInURL = "http://localhost:5000/api/auth/login"

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

function handleLogIn() {
    const form = document.getElementById('log-in-form')
    const email = form.elements['email'].value
    const password = form.elements['password'].value

    let userInfo = []
    userInfo.push({"email": email, "password": password})

    let request = new XMLHttpRequest();
    request.open("POST", logInURL, true)
    request.send(JSON.stringify(userInfo))
    request.onreadystatechange = function () {
        console.log(this.status)
        if (this.readyState === 4 && this.status === 200) {
            setCookie("jwt", request.responseText, 10)
        } else {
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