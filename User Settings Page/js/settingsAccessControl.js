if (getCookie('jwt') !== "") {
    let i = 1
} else {
    let i = 0
    window.location.replace("../Error/403.html")
}