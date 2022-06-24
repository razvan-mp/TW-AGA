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
                if (typeof result[0] === 'undefined') {
                    user["password"] = cyrb53(user["password"])
                    let sqlQuery = "insert into Awards.Persons (username, pass, email) values('" + user["username"] + "', '" + user['password'] + "', '" + user["email"] + "')";
                    connection.query(sqlQuery,
                        function (err, result, fields) {
                            if (err) throw err;

                            connection.query("insert into Awards.Preferences (person_id, tmz, yahoo, category_01, category_02, category_03, category_04, category_05) " +
                                "values((select id from Awards.Persons where email='" + user["email"] + "'), 0, 0, 0, 0, 0, 0, 0)",
                                function (err_insert, result_insert, fields) {
                                    if (err_insert) throw err_insert;
                                    resolve("User created!");

                                })
                        })
                } else console.log("failed")
            }
        );
    })
}

function checkUser(userObj) {
    const password = userObj['password']
    const email = userObj['email']

    return new Promise((resolve, reject) => {
        let sqlQuery = "select * from Persons where email='" + email + "'"
        connection.query(sqlQuery,
            function (err, result, fields) {
                if (err) throw err;
                if (typeof result[0] !== 'undefined') {
                    res = JSON.parse(JSON.stringify(result[0]))

                    if (res["pass"] == cyrb53(password).toString()) {
                        let prefsQuery = new Promise((resolvePref) => {
                            connection.query("select tmz, yahoo, category_01, category_02, category_03, category_04, category_05 from preferences where person_id=" + res["id"],
                                function (err_pref, result_pref, fields) {
                                    if (err_pref) throw err_pref;

                                    if (typeof result_pref[0] !== 'undefined') {
                                        res_pref = JSON.parse(JSON.stringify(result_pref[0]))
                                        for (const key of Object.keys(res_pref)) {
                                            res[key] = res_pref[key]
                                        }
                                    }
                                    resolvePref(res)
                                })
                        });

                        prefsQuery.then((response) => {
                            resolve(res)
                        })
                    }
                    else
                        resolve('not found')
                } else {
                    resolve('user not existent')
                }
            });
    })
}

function parseJwt(token) {
    const base64 = token.split('.')[1].replace(new RegExp('/-/g'), '+').replace(new RegExp('/-/g'), '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
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

    connection.query("UPDATE PREFERENCES SET " + preference + "=" + preferenceValue + " WHERE PERSON_ID=" + userId,
        function (update_err, update_result, fields) {
            if (update_err) throw update_err
        })
}

function updateUserPassword(body) {
    return new Promise((resolve) => {
        let jwt = body["jwt"]
        let password = body["pass"]

        let parsedJwt = parseJwt(jwt)
        let userId = parsedJwt["id"]

        connection.query("UPDATE Persons SET pass" + "='" + cyrb53(password) + "' WHERE ID=" + userId,
            function (update_err, update_result, fields) {
                if (update_err) {
                    resolve(401)
                    throw update_err
                }

                resolve(200)
            })
    })
}

function updateUserEmail(body) {
    return new Promise((resolve) => {
        let jwt = body["jwt"]
        let email = body["email"]

        // console.log(jwt + " " + preference + " " + preferenceValue)
        let parsedJwt = parseJwt(jwt)
        let userId = parsedJwt["id"]

        connection.query("select * from Persons where email='" + email + "'",
            function (err_select, res_select, fields) {
                if (err_select) throw err_select;

                if (typeof res_select[0] === 'undefined')
                    connection.query("UPDATE Persons SET email" + "='" + email + "' WHERE ID=" + userId,
                        function (update_err, update_result, fields) {
                            if (update_err) throw update_err

                            resolve(200)
                        })
                else resolve(401)
            })
    })
}

module.exports = {
    createUser,
    checkUser,
    updateUserPreference,
    updateUserEmail,
    updateUserPassword
};
