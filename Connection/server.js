const http = require("http");
const {
  getAwards,
  getTopActors,
  getYearsOfAwardsByActor,
  getActors,
  getAward,
  createAward,
  updateAward,
  getActor,
  getAllTimeStats,
  getActorsByCategory,
} = require("./controller/awardController");
const { getYahooNews, getTMZNews } = require("./controller/newsController");
const { updatePreference, registerUser, loginUser, updatePassword, updateEmail } = require("./controller/userController")

const server = http.createServer((req, res) => {
  // if(req.url === '/api/awards' && req.method === 'GET') {
  //     getAwards(req, res)

  // } else if(req.url.match(/\/api\/awards\/([0-9]+)/) && req.method === 'GET') {
  //     const id = req.url.split('/')[3]
  //     getAward(req, res, id)
  // } else if(req.url === '/api/awards' && req.method === 'POST') {
  //     createAward(req, res)
  // } else if(req.url.match(/\/api\/awards\/([0-9]+)/) && req.method === 'PUT') {
  //     const id = req.url.split('/')[3]
  //     updateAward(req, res, id)
  // } else
  if (req.url === "/api/awards" && req.method === "GET") {
    getAwards(req, res).then((r) => {
      return r;
    });
  } else if (
    req.url.match("/api/yearsOfAwards/([a-z .]+)") &&
    req.method === "GET"
  ) {
    const name = req.url.split("/")[3].replace("%20", " ");
    getYearsOfAwardsByActor(req, res, name).then((r) => {
      return r;
    });
  } else if (req.url === "/api/topActors" && req.method === "GET") {
    getTopActors(req, res).then((r) => {
      return r;
    });
  } else if (req.url === "/api/actors" && req.method === "GET") {
    getActors(req, res).then((r) => {
      return r;
    });
  } else if (req.url === "/api/awards" && req.method === "GET") {
    getAwards(req, res).then((r) => {
      return r;
    });
  } else if (req.url.match("/api/awards/([a-z .]+)") && req.method === "GET") {
    let actorName = req.url.split("/")[3];
    getActor(actorName.replaceAll("'", "\\'").replaceAll("%20", " "), res).then(
      (r) => {
        return r;
      }
    );
  } else if (req.url === "/api/all_time" && req.method === "GET") {
    getAllTimeStats(req, res).then((r) => {
      return r;
    });
  } else if (req.url === "/api/news/yahoo" && req.method === "GET") {
    getYahooNews(req, res).then((r) => {
      return r;
    });
  } else if (req.url === "/api/news/tmz" && req.method === "GET") {
    getTMZNews(req, res).then((r) => {
      return r;
    });
  } else if (req.url.match("/api/awards/(0[0-9])(&0[0-9])*") && req.method === "GET") {
    getActorsByCategory(req.url.split("/")[3], res).then((r) => {
      return r;
    })
  } else if (req.url === "/api/auth/register" && req.method === "POST") {
    registerUser(req, res).then((r) => {
      return r;
    })
  } else if (req.url === "/api/auth/login" && req.method === "POST") {
    loginUser(req, res).then((r) => {
      return r;
    })
  }
  else if (req.url.startsWith("/api/preference") && req.method === "POST") {
    updatePreference(req, res).then((r) => {
      return r;
    })
  }
  else if (req.url === "/api/auth/modify/email" && req.method === "POST") {
    updateEmail(req, res).then((r) => {
      return r;
    })
  }
  else if (req.url === "/api/auth/modify/password" && req.method === "POST") {
    updatePassword(req, res).then((r) => {
      return r;
    })
  }
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
