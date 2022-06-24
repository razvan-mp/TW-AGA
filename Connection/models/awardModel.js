const connection = require("../database/db_postgres.js");
const mysql = require("mysql");

function findActors() {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT DISTINCT NAME FROM ScreenActorGuildAwards WHERE Name <> '';",
            function (err, result, fields) {
                if (err) throw err;
                resolve(result);
            }
        );
    });
}

function findTopActors() {
    return new Promise((resolve, reject) => {
        let sql = "SELECT NAME, COUNT(*) As total, sum(case when Won = 'True' then 1 else 0 end) " + 
        "As WonCount FROM ScreenActorGuildAwards GROUP BY NAME HAVING NAME <> '' " + 
        "ORDER BY sum(case when Won = 'True' then 1 else 0 end) DESC LIMIT 10 offset 0;"
        connection.query(sql, function (err, result, fields) {
                if (err) throw err;
                resolve(result);
            }
        );
    });
}

function findYearsOfAwardsByActor(name) {
    return new Promise((resolve, reject) => {
        let sql =
            "SELECT NAME, CAST(LEFT(YEAR, 4) AS INTEGER) AS Year, COUNT(*) AS NumberOfAwards FROM ScreenActorGuildAwards WHERE Won = 'True' GROUP BY NAME, YEAR HAVING NAME = ?";
        const inserts = [name];
        sql = mysql.format(sql, inserts);
        connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            resolve(result);
        });
    });
}

function findByName(name) {
    return new Promise((resolve, reject) => {
        name = name.trimStart();
        let sql = "SELECT * FROM ScreenActorGuildAwards WHERE NAME LIKE ? OR NAME LIKE ?";
        const inserts = [name + '%', "% " + name + "%"];
        sql = mysql.format(sql, inserts);
        connection.query(
            sql, function (err, result, fields) {
                if (err) throw err;
                resolve(result);
            }
        );
    });
}

function findAll() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM ScreenActorGuildAwards", function (err, result, fields) {
            if (err)
                throw err;
            resolve(result);
        });
    });
}

function findAllStats() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT left(YEAR, 4) AS YEAR, COUNT(*) AS TOTAL, SUM(CASE WHEN WON='True' THEN 1 ELSE 0 END) AS WINS, SUM(CASE WHEN WON='False' THEN 1 ELSE 0 END) AS LOSSES FROM screenactorguildawards GROUP BY YEAR HAVING YEAR LIKE '%-%'", function (err, result, fields) {
            if (err)
                throw err
            resolve(result)
        })
    })
}

function findRandomActors() {
    return new Promise((resolve, reject) => {
        connection.query("select name from screenactorguildawards where name <> '' and (year like '2020%' or year like '2019%' or year like '2018%') group by name having sum(case when won='True' then 1 else 0 end) > 0 order by random() limit 10;", function (err, result, fields) {
            if (err)
                throw err
            resolve(result)
        })
    })
}

function findActorsByCategory(category) {
    return new Promise((resolve, reject) => {
        let sqlFilters = "where "
        let categoriesList = []
        if(category.includes("&"))
            categoriesList = category.split('&')
        else {
            categoriesList[0] = category
        }

        let toUnion = 0, hasMotionMovieCategory = 0;
        let sqlFilters05 = "";
        for (let i = 0; i < categoriesList.length; i++) {
            switch(categoriesList[i]) {
                case "01": {
                    if(i > 0)
                        sqlFilters += ' or '
                    sqlFilters += "category='Female actor in a leading role'"
                    toUnion = 1
                    break;
                }
                case "02": {
                    if(i > 0)
                        sqlFilters += ' or '
                    sqlFilters += "category='Male actor in a leading role'"
                    toUnion = 1
                    break;
                }
                case "03": {
                    if(i > 0)
                        sqlFilters += ' or '
                    sqlFilters += "category='Female actor in a supporting role'"
                    toUnion = 1
                    break;
                }
                case "04": {
                    if(i > 0)
                        sqlFilters += ' or '
                    sqlFilters += "category='Male actor in a supporting role' "
                    toUnion = 1
                    break;
                }
                case "05": {
                    sqlFilters05 = "category='Cast in a motion picture'"
                    hasMotionMovieCategory = 1;
                    break;
                }
            }
        }

        let sqlQuery;
        if(toUnion === 1 && hasMotionMovieCategory === 1)
            sqlQuery = "select * from ScreenActorGuildAwards " + sqlFilters + " union all (select * from ScreenActorGuildAwards where " + sqlFilters05 + " limit 40)"
        else
            sqlQuery = "select * from ScreenActorGuildAwards " + sqlFilters + sqlFilters05;

        console.log(sqlQuery)

        connection.query(sqlQuery + " order by random()", function (err, result, fields) {
            if (err)
                throw err
            resolve(result)
        })
    })
}

module.exports = {
    findTopActors,
    findYearsOfAwardsByActor,
    findActors,
    findAll,
    findByName,
    findAllStats,
    findRandomActors,
    findActorsByCategory
};
