const express = require('express');
const router = express.Router();

const bookController = require('../controllers/book.controller');

router.get('/userId/:id_user',bookController.getBookByIdUser);
router.post('/new', bookController.createBook);
router.post('/join', bookController.joinBook);
router.get('/bookid/:id_book/userid/:id_user',bookController.getDetailBook);
router.post('/update',bookController.updateBook)
router.delete('/:id_book',bookController.deleteBook);
router.delete('/unjoin/:id_book_user',bookController.unjoinBook);
router.post('/join/update',bookController.updateUserBook)

module.exports = router;