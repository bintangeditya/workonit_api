var dbConn  = require('../../config/db.config');


var Book = function(book){
    this.id_book        =   book.id_book;
    this.title          =   book.title;
    this.description    =   book.description;
    this.type           =   book.type;
}


Book.getBookByIdUser = (id_user, result)=>{
    console.log('userReqData');
    dbConn.query('SELECT * FROM `book` NATURAL JOIN book_user WHERE id_user =?', id_user, (err, res)=>{
        if(err){
            console.log(err);
            result(true, err);
        }else{
            result(null, res);
        }
    })
}

Book.createBook = (bookReqData, result) =>{
    console.log('createBook');
    dbConn.query('INSERT INTO book SET ? ', bookReqData, (err, res)=>{
        if(err){
            console.log(err);
            result(true, err);
        }else{
            result(null, res)
        }
    })
}

Book.getBookByIdBook = (id_book, result)=>{
    console.log('userReqData');
    dbConn.query('SELECT * FROM `book` WHERE id_book =?', id_book, (err, res)=>{
        if(err){
            console.log(err);
            result(true, err);
        }else{
            result(null, res);
        }
    })
}

Book.getBookByIdBookIdUser = (id_book,id_user, result)=>{
    console.log('userReqData');
    dbConn.query('SELECT * FROM `book` NATURAL JOIN book_user WHERE id_book =? AND id_user =?', [id_book,id_user], (err, res)=>{
        if(err){
            console.log(err);
            result(true, err);
        }else{
            result(null, res);
        }
    })
}

Book.updateBook = (book, result)=>{
    dbConn.query("UPDATE book SET description =?, title =?, type =? WHERE id_book =?", [book.description,book.title,book.type,book.id_book], (err, res)=>{
        if(err){
            console.log(err);
            result(true, err);
        }else{
            result(null, res);
        }
    });
}



Book.deleteBook = (id_book,result)=>{
    dbConn.query('DELETE FROM book WHERE id_book=?', [id_book], (err, res)=>{
        if(err){
            console.log(err);
            result(true, err);
        }else{
            result(null, res);
        }
    })
}

module.exports = Book;