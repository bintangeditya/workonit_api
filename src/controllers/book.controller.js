
const BookModel = require('../models/book.model');
const UserModel = require('../models/user.model');
const UserBook = require('../models/userBook.model');
const UserBookModel = require('../models/userBook.model');


exports.getBookByIdUser = (req, res)=>{
    console.log('getBookByIdUser');
    BookModel.getBookByIdUser(req.params.id_user, (err, books)=>{
        if(err) 
        res.json({status: false, message: 'Problem'});
        res.json({status: true, message: 'Success', data: books});
    })
}

exports.createBook = (req, res)=>{
    const bookReqData = new BookModel(req.body);
    console.log('dasdjadsascbhda', bookReqData);
    bookReqData.type = 'private'
    const userbookReqData = new UserBookModel(req.body);
    userbookReqData.mute = 0
    userbookReqData.status = 'owner'
    console.log('bookReqData', bookReqData);
    BookModel.createBook(bookReqData, (err, resBook)=>{
        if(err){
            console.log('bookReqData', err);
            res.json({status: false, message: 'Problem'});
        }else{
            userbookReqData.id_book = resBook.insertId 
            console.log('userbookReqData', userbookReqData);
            UserBook.createUserBook(userbookReqData, (err, resUserBook)=>{
                if(err){
                    console.log('userbookReqData', err);
                    res.json({status: false, message: 'Problem'});
                }else{
                    res.json({status: true, message: 'Success'});
                } 
            })  
        }
    })
}

exports.joinBook = (req, res)=>{
    console.log(req.body)
    BookModel.getBookByIdBook(req.body.id_book, (err, books)=>{
        if(err) 
        res.json({status: false, message: 'Problem'});
        if(!Object.keys(books).length)
        res.json({status: false, message: 'Id Book not found'});
        if(books[0].type == 'private')
        res.json({status: false, message: 'Book is private'});
        const reqUserBook = new UserBook(req.body)
        reqUserBook.mute = 0
        reqUserBook.status = 'member'
        UserBook.createUserBook(reqUserBook, (err,books)=>{
            if(err)
            res.json({status: false, message: 'Problem'});
            res.json({status: true, message: 'Success'});
        })
        
    })
}

exports.getDetailBook = (req, res)=>{
    BookModel.getBookByIdBookIdUser(req.params.id_book,req.params.id_user, (err, books)=>{
        if(err) 
        res.json({status: false, message: 'Problem'});
        UserModel.getUserByIdBook(req.params.id_book, (err, users)=>{
            if(err) 
            res.json({status: false, message: 'Problem'});
            const book = books[0]
            book.member = users
            res.json({status: true, message: 'Success', data: book});
        })
        
    })
}

exports.updateBook = (req, res) =>{
    const bookReqData = new BookModel(req.body);
    console.log('bookReqData',bookReqData)
    console.log('req.body',req.body)
    BookModel.updateBook(bookReqData,(err,books)=>{
        if(err) 
        res.json({status: false, message: 'Problem'});
        res.json({status: true, message: 'Success'});
    })
}

exports.deleteBook = (req,res) =>{
    BookModel.deleteBook(req.params.id_book, (err, books)=>{
        if(err)
        res.json({status: false, message: 'Problem'});
        res.json({status:true, message: 'Success'});
    })
}

exports.unjoinBook = (req,res) =>{
    UserBook.deleteUserBook(req.params.id_book_user, (err, userbooks)=>{
        if(err)
        res.json({status: false, message: 'Problem'});
        res.json({status:true, message: 'Success'});
    })

}

exports.updateUserBook = (req, res) =>{
    const userBookReqData = new UserBook(req.body);
    console.log('userBookReqData',userBookReqData)
    console.log('req.body',req.body)
    UserBookModel.updateUserBook(userBookReqData,(err,books)=>{
        if(err) 
        res.json({status: false, message: 'Problem'});
        res.json({status: true, message: 'Success'});
    })
}