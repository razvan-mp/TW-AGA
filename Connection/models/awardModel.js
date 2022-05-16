
// const awards = require('../dataTest/actorsTest')
const oracledb = require('oracledb')
// const {v4: uuidv4} = require('uuid')

// const {writeDataToFile} = require('../utils')

// function findAll() {
//     return new Promise((resolve, reject) => {
//         resolve(awards)
//     })
// }

// function findById(id) {
//     return new Promise((resolve, reject) => {
//         const award = awards.find((p) => p.id === id)
//         resolve(award)
//     })
// }

// function create(award) {
//     return new Promise((resolve, reject) => {
//         const newAward = {id: uuidv4(), ...award}
//         awards.push(newAward)
//         writeDataToFile('Connection/dataTest/actorsTest.json', awards)
//         resolve(newAward)
//     })
// }

// function update(id, award) {
//     return new Promise((resolve, reject) => {
//         const index = awards.findIndex((p) =>p.id === id)
//         awards[index] = {id, ...award}

//         writeDataToFile('Connection/dataTest/actorsTest.json', awards)
//         resolve(awards[index])
//     })
// }

function findAllOracle() {
    return new Promise((resolve, reject) => {
        const connectioString = "(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = 192.168.43.89)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = server2)(PORT =1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD=BASIC))))"
        oracledb.getConnection({
            user:'STUDENT',
            password:'PASSWORD',
            tns:connectioString
        },function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
                 connection.execute("SELECT * FROM ScreenActorGuildAwards ORDER BY Id",[], function(err, result) {
                if (err) { console.error(err.message);
                      doRelease(connection);
                      return;
                 }
                 console.log(result.metaData);
                 resolve(result.rows);
                 doRelease(connection);
               });
            });
            function doRelease(connection) {
                   connection.release(function(err) {
                     if (err) {
                      console.error(err.message);
                    }
                  }
               );
            }
        
    })
}

module.exports = {
    // findAll,
    // findById,
    // create,
    // update,
    findAllOracle
}