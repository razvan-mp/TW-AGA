function setCookie(cname, exdays) {
    let cvalue;

    switch (cname) {
        case "yahoo": {
            // update cookie
            if (getCookie('yahoo') === '1') {
                cvalue = 0;
                let element = document.getElementById('firstItem')
                element.classList.remove('item-is-selected')
            } else if (getCookie('yahoo') === '0') {
                cvalue = 1;
                let element = document.getElementById('firstItem')
                element.classList.add('item-is-selected')
            } else {
                cvalue = 1;
                let element = document.getElementById('firstItem')
                element.classList.add('item-is-selected')
            }
            break
        }
        case "tmz": {
            // update cookie
            if (getCookie('tmz') === '1') {
                cvalue = 0;
                    let element = document.getElementById('secondItem')
                element.classList.remove('item-is-selected')
            } else if (getCookie('tmz') === '0' || getCookie('tmz') == undefined) {
                cvalue = 1;
                let element = document.getElementById('secondItem')
                element.classList.add('item-is-selected')
            } else {
                cvalue = 1;
                let element = document.getElementById('secondItem')
                element.classList.add('item-is-selected')
            }
            break
        }
    }

    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    console.log(document.cookie)
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

if (getCookie('yahoo') === '1') {
    document.getElementById('firstItem').classList.add('item-is-selected')
}

if (getCookie('tmz') === '1') {
    document.getElementById('secondItem').classList.add('item-is-selected')
}