var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '13.209.70.174',
  user     : 'root',
  password : 'chl13996po',
  database : 'alba_db'
});
 
connection.connect();
 
connection.query('SELECT * FROM big_category', function (error, results, fields) {
  if (error){
      console.log(error);
  };
  console.log(results);
});
 
connection.end();