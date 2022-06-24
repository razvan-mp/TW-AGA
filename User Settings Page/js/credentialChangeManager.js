const emailURL = "http://localhost:5000/api/auth/modify/email"
const passwordURL = "http://localhost:5000/api/auth/modify/password"

const delay = ms => new Promise(res => setTimeout(res, ms));

async function emailHandler() {
    const form = document.getElementById('email-form');
    const email = form.elements['email'].value;

    let formData = [{ "email": email, "jwt": getCookie("jwt") }]

    let request = new XMLHttpRequest();
    request.open("POST", emailURL, true)
    request.send(JSON.stringify(formData))
    request.onreadystatechange = async function () {
        if (this.readyState === 4 && this.status == 200) {
            const formText = form.innerHTML;
            document.getElementById('email-form').innerHTML += "<div class='msg-box' style='padding: 10px;background: rgba(75, 255, 75, 0.353); margin: 5px;'><p>Changed successfully!</p></div>";
            await delay(3000)
            form.innerHTML = formText
        } else if (this.readyState === 4 && this.status === 401) {
            const formText = form.innerHTML;
            document.getElementById('email-form').innerHTML += "<div class='msg-box' style='padding: 10px;background: rgba(253, 64, 64, 0.292); margin: 5px;'><p>Email already taken!</p></div>";
            await delay(3000)
            form.innerHTML = formText
        }
    }
}

async function passwordHandler() {
    const form = document.getElementById('password-form');
    const pass = form.elements['pass'].value;
    const passConfirm = form.elements['pass_confirm'].value;

    if (pass !== passConfirm) {
        const formText = form.innerHTML;
        document.getElementById('password-form').innerHTML += "<div class='msg-box' style='padding: 10px;background: rgba(253, 64, 64, 0.292); margin: 5px;'><p>Passwords do not match!</p></div>";
        await delay(3500)
        form.innerHTML = formText
    } else {
        let formData = [{ "pass": pass, "jwt": getCookie("jwt") }]

        let request = new XMLHttpRequest();
        request.open("POST", passwordURL, true)
        request.send(JSON.stringify(formData))
        request.onreadystatechange = async function () {
            if (this.readyState === 4 && this.status === 200) {
                const formText = form.innerHTML;
                document.getElementById('password-form').innerHTML += "<div class='msg-box' style='padding: 10px;background: rgba(75, 255, 75, 0.353); margin: 5px;'><p>Changed successfully!</p></div>";
                await delay(3500)
                form.innerHTML = formText
            } else if (this.readyState === 4 && this.status === 401) {
                const formText = form.innerHTML;
                document.getElementById('password-form').innerHTML += "<div class='msg-box' style='padding: 10px;background: rgba(253, 64, 64, 0.292); margin: 5px;'><p>Could not change password!</p></div>";
                await delay(3500)
                form.innerHTML = formText
            }
        }
    }
}