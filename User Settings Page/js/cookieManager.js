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
        case "01":
        case "02":
        case "03":
        case "04":
        case "05":
        case "06":{
            console.log("cookie")
            if(document.getElementById(cname).checked) {
                cvalue = 1;
            }
            else cvalue = 0;
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

if(getCookie('01') === '1') {
    document.getElementById('01').checked = 1;
}

if(getCookie('02') === '1') {
    document.getElementById('02').checked = 1;
}

if(getCookie('03') === '1') {
    document.getElementById('03').checked = 1;
}

if(getCookie('04') === '1') {
    document.getElementById('04').checked = 1;
}

if(getCookie('05') === '1') {
    document.getElementById('05').checked = 1;
}