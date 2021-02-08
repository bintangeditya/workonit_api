const mysql = require('mysql');

// create here mysql connection

const dbConn = mysql.createConnection({
    host: 'db4free.net',
    user: 'workonit',
    password: 'workonit',
    database: 'workonit'
});

dbConn.connect(function(error){
    if(error) throw error;
    console.log('Database Connected Successfully!!!');
})

module.exports = dbConn;
