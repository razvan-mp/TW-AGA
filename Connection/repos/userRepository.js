let users = [
    {
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
        user["password"] = cyrb53(user["password"])
        let flag = false;
        for (let i = 0; i < users.length; i++) {
            if (users[i]["email"] === user["email"]) {
                flag = true;
                resolve(1);
            }
        }

        if (flag === false) {
            users.push(user);
            console.log(users)
            resolve(0);
        }
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

module.exports = {
    createUser,
    checkUser
};
