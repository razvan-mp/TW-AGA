function setCookieWithExp(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function resetCookies() {
    setCookieWithExp("jwt", '', 10)
    setCookieWithExp("tmz", 0, 10)
    setCookieWithExp("yahoo", 0, 10)
    setCookieWithExp("category_01", 0, 10)
    setCookieWithExp("category_02", 0, 10)
    setCookieWithExp("category_03", 0, 10)
    setCookieWithExp("category_04", 0, 10)
    setCookieWithExp("category_05", 0, 10)
    window.location.replace("../Home%20page/index.html")
}

const loggedInNav = "    <a href=\"/\" class=\"logo\">AGA</a>\n" +
"    <input class=\"menu-btn\" type=\"checkbox\" id=\"menu-btn\"/>\n" +
"    <label class=\"menu-icon\" for=\"menu-btn\"><span class=\"nav-icon\"></span></label>\n" +
"    <ul class=\"menu\">\n" +
"        <li><a href=\"../Home%20page/index.html\" class=\"navbar-button\">Home</a></li>\n" +
"        <li><a href=\"../Slider%20Page/slider.html\" class=\"navbar-button\">News</a></li>\n" +
"        <li><a href=\"../Statistics%20Page/statistics.html\" class=\"navbar-button\">Statistics</a></li>\n" +
"        <li><a href=\"../User Settings%20Page/userSettings.html\" class=\"navbar-button\">Settings</a></li>\n" +
"        <li><a href=\"../Home%20page/index.html\" class=\"logout-button\" onclick=\"resetCookies()\">Log out</a></li>\n" +
"    </ul>"

const loggedOutNav = "    <a href=\"/\" class=\"logo\">AGA</a>\n" +
"    <input class=\"menu-btn\" type=\"checkbox\" id=\"menu-btn\"/>\n" +
"    <label class=\"menu-icon\" for=\"menu-btn\"><span class=\"nav-icon\"></span></label>\n" +
"    <ul class=\"menu\">\n" +
"        <li><a href=\"../Home%20page/index.html\" class=\"navbar-button\">Home</a></li>\n" +
"        <li><a href=\"../Slider%20Page/slider.html\" class=\"navbar-button\">News</a></li>\n" +
"        <li><a href=\"../Statistics%20Page/statistics.html\" class=\"navbar-button\">Statistics</a></li>\n" +
"        <li><a href=\"../Login%20Page%20with%20Navbar/login.html\" class=\"login-button\">Log in</a></li>\n" +
"    </ul>"

function parseJwt (token) {
    const base64 = token.split('.')[1].replace(new RegExp('/-/g'), '+').replace(new RegExp('/-/g'), '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

if (getCookie('jwt') !== "") {
    document.getElementById('header').innerHTML = loggedInNav
} else {
    document.getElementById('header').innerHTML = loggedOutNav
}
