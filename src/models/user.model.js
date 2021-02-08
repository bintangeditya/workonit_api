var dbConn  = require('../../config/db.config');

var User = function(user){
    this.id_user   =   user.id_user;
    this.name      =   user.name;
    this.token     =   user.token;
    this.photo     =   user.photo;
    this.email     =   user.email;
}

User.getUserByEmail = (email, result)=>{
    console.log('getUserByEmail');
    dbConn.query('SELECT * FROM user WHERE email=?', email, (err, res)=>{
        if(err){
            console.log('Error : getUserByEmail', err);
            result(true, err);
        }else{
            result(null, res);
        }
    })
}

User.getUserByIdBook = (idBook, result)=>{
    console.log('getUserByIdBook');
    dbConn.query('SELECT * FROM user NATURAL JOIN book_user WHERE id_book=?', idBook, (err, res)=>{
        if(err){
            console.log('Error : getUserByIdBook', err);
            result(true, err);
        }else{
            result(null, res);
        }
    })
}

User.createUser = (userReqData, result) =>{
    console.log('createUser');
    dbConn.query('INSERT INTO user SET ? ', userReqData, (err, res)=>{
        if(err){
            console.log('Error : createUser');
            result(true, err);
        }else{
            console.log('Successfully : createUser');
            result(null, res)
        }
    }) 
}


module.exports = User;