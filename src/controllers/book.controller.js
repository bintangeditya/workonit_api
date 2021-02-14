
const BookModel = require('../models/book.model');
const UserModel = require('../models/user.model');
const UserBook = require('../models/userBook.model');
const UserBookModel = require('../models/userBook.model');
const BookMemberModel = require('../models/bookmember.model');


exports.getBookByIdUser = (req, res)=>{
    console.log('getBookByIdUser');
    BookModel.getBookByIdUser(req.params.id_user, (err, books)=>{
        if(err) 
        res.json({status: false, message: 'Gagal'});
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
            res.json({status: false, message: 'Gagal'});
        }else{
            userbookReqData.id_book = resBook.insertId 
            console.log('userbookReqData', userbookReqData);
            UserBook.createUserBook(userbookReqData, (err, resUserBook)=>{
                if(err){
                    console.log('userbookReqData', err);
                    res.json({status: false, message: 'Gagal'});
                }else{
                    BookModel.getBookByIdUserIdBook(req.body.id_user,resBook.insertId, (err, books2)=>{
                        if(err) 
                        res.json({status: false, message: 'Gagal'});
                        res.json({status: true, message: 'Success', data: books2});
                    })

                } 
            })  
        }
    })
}

exports.joinBook = (req, res)=>{
    console.log(req.body)
    BookModel.getBookByIdBook(req.body.id_book, (err, books)=>{
        if(err) 
            res.json({status: false, message: 'Gagal'});
        if(!Object.keys(books).length)
            res.json({status: false, message: 'Id Book tidak ditemukan'});
        else
        UserBook.getUserBookByIdUserIdBook(req.body.id_user,req.body.id_book,(err,userBook)=>{
            if(err) 
            res.json({status: false, message: 'Gagal'});
            if(!Object.keys(userBook).length){
                if(books[0].type == 'private')
                res.json({status: false, message: 'Book bertipe Private'});
                const reqUserBook = new UserBook(req.body)
                reqUserBook.mute = 0
                reqUserBook.status = 'member'
                UserBook.createUserBook(reqUserBook, (err,createUserBookRes)=>{
                    if(err)
                    res.json({status: false, message: 'Gagal'});
                    BookModel.getBookByIdUserIdBook(req.body.id_user,req.body.id_book, (err, books2)=>{
                        if(err) 
                        res.json({status: false, message: 'Gagal'});
                        res.json({status: true, message: 'Success', data: books2});
                    })
                })
            }else
                res.json({status: false, message: 'Anda telah bergabung dengan Book'});
        })
    })
}

exports.getDetailBook = (req, res)=>{
    BookModel.getBookByIdBookIdUser(req.params.id_book,req.params.id_user, (err, books)=>{
        if(err) 
        res.json({status: false, message: 'Gagal'});
        UserModel.getUserByIdBook(req.params.id_book, (err, users)=>{
            if(err) 
            res.json({status: false, message: 'Gagal'});
            const book = books[0]
            const bookMember = new BookMemberModel(book)
            bookMember.member = users
            res.json({status: true, message: 'Success', data: [bookMember]});
        })
        
    })
}

exports.updateBook = (req, res) =>{
    const bookReqData = new BookModel(req.body);
    console.log('bookReqData',bookReqData)
    console.log('req.body',req.body)
    BookModel.updateBook(bookReqData,(err,books)=>{
        if(err) 
        res.json({status: false, message: 'Gagal'});
        res.json({status: true, message: 'Success'});
    })
}

exports.deleteBook = (req,res) =>{
    BookModel.deleteBook(req.params.id_book, (err, books)=>{
        if(err)
        res.json({status: false, message: 'Gagal'});
        res.json({status:true, message: 'Success'});
    })
}

exports.unjoinBook = (req,res) =>{
    UserBook.deleteUserBook(req.params.id_book_user, (err, userbooks)=>{
        if(err)
        res.json({status: false, message: 'Gagal'});
        res.json({status:true, message: 'Success'});
    })

}

exports.updateUserBook = (req, res) =>{
    const userBookReqData = new UserBook(req.body);
    console.log('userBookReqData',userBookReqData)
    console.log('req.body',req.body)
    UserBookModel.updateUserBook(userBookReqData,(err,books)=>{
        if(err) 
        res.json({status: false, message: 'Gagal'});
        res.json({status: true, message: 'Success'});
    })
}

exports.getQod = (req,res)=>{
    
}