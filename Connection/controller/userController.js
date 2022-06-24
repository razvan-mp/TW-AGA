const jwt = require("jsonwebtoken")
const { createUser, checkUser, updateUserPreference, updateUserEmail, updateUserPassword } = require("../repos/userRepository");

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
            if (userData === 'not found') {
                res.writeHead(401, {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers":
                        "Origin, X-Requested-With, Content-Type, Accept",
                    "Access-Control-Allow-Methods": "POST",
                });
                res.end(JSON.stringify('User does not exist.'))
            } else {
                res.writeHead(200, {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers":
                        "Origin, X-Requested-With, Content-Type, Accept",
                    "Access-Control-Allow-Methods": "POST",
                });
                const token = jwt.sign(JSON.stringify(userData), "secret")
                res.end(JSON.stringify(token))
            }
        });
    });
}

async function updatePreference(req, res) {
    let body = "";
    req.on("data", (chunk) => {
        body += chunk.toString();
    });

    req.on("end", () => {
        let userPrefs = JSON.parse(body)[0];
        updateUserPreference(userPrefs)
    });


    try {
        res.writeHead(200, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
                "Origin, X-Requested-With, Content-Type, Accept",
            "Access-Control-Allow-Methods": "POST",
        });
        res.end('')
    }
    catch (error) {
        console.log(error)
    }
}

async function updateEmail(req, res) {
    let body = "";
    req.on("data", (chunk) => {
        body += chunk.toString();
    });

    req.on("end", () => {
        let userEmail = JSON.parse(body)[0];
        updateUserEmail(userEmail).then((r) => {
            res.writeHead(r, {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers":
                    "Origin, X-Requested-With, Content-Type, Accept",
                "Access-Control-Allow-Methods": "POST",
            })
            res.end()
        })
    });

    
}

async function updatePassword(req, res) {
    let body = "";
    req.on("data", (chunk) => {
        body += chunk.toString();
    });

    req.on("end", () => {
        let userPassword = JSON.parse(body)[0];
        updateUserPassword(userPassword).then((r) => {
            res.writeHead(r, {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers":
                    "Origin, X-Requested-With, Content-Type, Accept",
                "Access-Control-Allow-Methods": "POST",
            })
            res.end()
        })
    });
    
}

module.exports = {
    registerUser,
    loginUser,
    updatePreference,
    updateEmail,
    updatePassword
};
