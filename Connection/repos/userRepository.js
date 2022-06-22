// const { query } = require("../database/db");
const connection = require("../database/db");

let users = [
    {
        id: 1,
        username: "Ionica",
        email: "ionica2002@yahoo.com",
        password: "7363520259516546",
    },
];

const cyrb53 = function (str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

function createUser(user) {
    return new Promise((resolve, reject) => {
        connection.query("select * from Awards.Persons where email='" + user["email"] + "'",
        function (err, result) {
            if (err) throw err;
                resolve(result);
            if(typeof result[0] === 'undefined')
            {
                user["password"] = cyrb53(user["password"])
                let sqlQuery =  "insert into Awards.Persons (username, pass, email) values('" + user["username"] + "', '" + user['password'] + "', '" + user["email"] + "')";
                console.log(sqlQuery)
                connection.query(sqlQuery,
                    function (err, result, fields) {
                        if (err) throw err;
                        resolve(result);
                    }
                );
            }
            else console.log("failed")
        })
        });
}

function checkUser(userObj) {
    const password = userObj['password']
    const email = userObj['email']
    return new Promise((resolve, reject) => {
        let flag = false
        for (let user of users) {
            if (user['email'] === email) {
                if (cyrb53(password).toString() == user['password']) {
                    flag = true
                    resolve(user)
                    break
                }
            }
        }

        if (flag === false) {
            resolve('not found')
        }
    })
}

function parseJwt (token) {
    const base64 = token.split('.')[1].replace(new RegExp('/-/g'), '+').replace(new RegExp('/-/g'), '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

function updateUserPreference(body) {
    let jwt = body["jwt"]
    let preference = body["preference"]
    let preferenceValue = body["value"]

    // console.log(jwt + " " + preference + " " + preferenceValue)
    let parsedJwt = parseJwt(jwt)
    let userId = parsedJwt["id"]
}

module.exports = {
    createUser,
    checkUser,
    updateUserPreference
};
