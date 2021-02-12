var BookMember = function(book){
    this.id_book        =   book.id_book;
    this.title          =   book.title;
    this.description    =   book.description;
    this.type           =   book.type;
    this.member           =   book.member;
}

module.exports = BookMember;