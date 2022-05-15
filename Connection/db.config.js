var oracledb = require('oracledb');
oracledb.getConnection({
      user: "STUDENT",
      password: "PASSWORD",
      connectString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST   = Hostname)(PORT = port))(CONNECT_DATA =(SID= service name)))"
}, function(err, connection) {
if (err) {
    console.error(err.message);
    return;
}
     connection.execute("SELECT * FROM CURSURI",[], function(err, result) {
    if (err) { console.error(err.message);
          doRelease(connection);
          return;
     }
     console.log(result.metaData);
     console.log(result.rows);
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