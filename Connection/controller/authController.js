const jwt = require("jsonwebtoken")
const { createUser, checkUser } = require("../repos/userRepository");

async function registerUser(req, res) {
    res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
        "Access-Control-Allow-Methods": "POST",
    });

    let body = "";
    req.on("data", (chunk) => {
        body += chunk.toString();
    });

    req.on("end", () => {
        createUser(JSON.parse(body)[0]).then((r) => {
            res.end(JSON.stringify(r));
        });
    });
}

async function loginUser(req, res) {
    let body = "";
    req.on("data", (chunk) => {
        body += chunk.toString();
    });

    req.on("end", () => {
        checkUser(JSON.parse(body)[0]).then((userData) => {
            let token;
            if (userData === 'not found') {
                res.writeHead(401, {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers":
                    "Origin, X-Requested-With, Content-Type, Accept",
                    "Access-Control-Allow-Methods": "POST",
                });
                token = ''
                res.end(JSON.stringify(token))
            } else if (userData === 'user not existent') {
                res.writeHead(418, {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers":
                    "Origin, X-Requested-With, Content-Type, Accept",
                    "Access-Control-Allow-Methods": "POST",
                });
                token = ''
                res.end(JSON.stringify(token))
            } else {
                res.writeHead(200, {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers":
                    "Origin, X-Requested-With, Content-Type, Accept",
                    "Access-Control-Allow-Methods": "POST",
                });
                token = jwt.sign(JSON.stringify(userData), "secret")
                res.end(JSON.stringify(token))
            }
        });
    });
}

module.exports = {
    registerUser,
    loginUser
};
