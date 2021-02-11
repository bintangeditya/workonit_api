var dbConn  = require('../../config/db.config');

var UserBook = function(userBook){
    this.id_book_user         =   userBook.id_book_user ;
    this.id_book              =   userBook.id_book;
    this.id_user              =   userBook.id_user;
    this.mute                 =   userBook.mute;
    this.status               =   userBook.status;
}

UserBook.getUserBookByIdUserIdBook = (idUser,idBook, result)=>{
    dbConn.query('SELECT * FROM book_user WHERE id_user=? AND id_book=?', [idUser,idBook], (err, res)=>{
        if(err){
            console.log('Error : getUserBookByIdUserIdBook', err);
            result(true, err);
        }else{
            result(null, res);
        }
    })
}


UserBook.createUserBook = (userBookReqData, result) =>{
    console.log('createUserBook');
    dbConn.query('INSERT INTO book_user SET ? ', userBookReqData, (err, res)=>{
        if(err){
            console.log(err);
            result(true, err);
        }else{
            result(null, res)
        }
    })
}

UserBook.deleteUserBook = (id_user_book,result)=>{
    dbConn.query('DELETE FROM book_user WHERE id_book_user =?', [id_user_book], (err, res)=>{
        if(err){
            console.log(err);
            result(true, err);
        }else{
            result(null, res);
        }
    })
}

UserBook.updateUserBook = (userBook, result)=>{
    dbConn.query("UPDATE book_user SET mute =? , status =? WHERE id_book_user =?", [userBook.mute, userBook.status,userBook.id_book_user], (err, res)=>{
        if(err){
            console.log(err);
            result(true, err);
        }else{
            result(null, res);
        }
    });
}

// UserBook.createUserBook = (bookReqData,userbookReqData, result) =>{
//     console.log('createBook');
//     dbConn.query('INSERT INTO book SET ? ', bookReqData, (err, res)=>{
//         if(err){
//             console.log('Error while inserting data');
//             result(null, err);
//         }else{
//             dbConn.query('INSERT INTO book_user SET ? ', userbookReqData, (err, res)=>{
//                 if(err){
//                     console.log('Error while inserting data');
//                     result(null, err);
//                 }else{
//                     console.log('Book created successfully');
//                     result(null, res)
//                 }
//             })
//         }
//     })
// }

module.exports = UserBook;