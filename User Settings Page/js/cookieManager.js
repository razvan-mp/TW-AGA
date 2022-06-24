function setCookie(cname, exdays) {
    let cvalue;
    switch (cname) {
        case "yahoo": {
            // update cookie
            if (getCookie('yahoo') === '1') {
                cvalue = 0;
                let element = document.getElementById('firstItem')
                element.classList.remove('item-is-selected')
                element.classList.add('anim')
            } else if (getCookie('yahoo') === '0') {
                cvalue = 1;
                let element = document.getElementById('firstItem')
                element.classList.add('item-is-selected')
                element.classList.remove('anim')
            } else {
                cvalue = 1;
                let element = document.getElementById('firstItem')
                element.classList.add('item-is-selected')
                element.classList.remove('anim')
            }
            break
        }
        case "tmz": {
            // update cookie
            if (getCookie('tmz') === '1') {
                cvalue = 0;
                    let element = document.getElementById('secondItem')
                element.classList.remove('item-is-selected')
                element.classList.add('anim')
            } else if (getCookie('tmz') === '0' || getCookie('tmz') == undefined) {
                cvalue = 1;
                let element = document.getElementById('secondItem')
                element.classList.add('item-is-selected')
                element.classList.remove('anim')
            } else {
                cvalue = 1;
                let element = document.getElementById('secondItem')
                element.classList.add('item-is-selected')
                element.classList.remove('anim')
            }
            break
        }
        case "category_01":
        case "category_02":
        case "category_03":
        case "category_04":
        case "category_05":
        case "category_06": {
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
    document.getElementById('firstItem').classList.remove('anim')
}

if (getCookie('tmz') === '1') {
    document.getElementById('secondItem').classList.add('item-is-selected')
    document.getElementById('secondItem').classList.remove('anim')
}

if(getCookie('category_01') === '1') {
    document.getElementById('category_01').checked = 1;
}

if(getCookie('category_02') === '1') {
    document.getElementById('category_02').checked = 1;
}

if(getCookie('category_03') === '1') {
    document.getElementById('category_03').checked = 1;
}

if(getCookie('category_04') === '1') {
    document.getElementById('category_04').checked = 1;
}

if(getCookie('category_05') === '1') {
    document.getElementById('category_05').checked = 1;
}