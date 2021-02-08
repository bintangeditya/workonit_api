var dbConn  = require('../../config/db.config');


var Label = function(label){
    this.id_lable        =   label.id_lable;
    this.title_lable     =   label.title_lable;
    this.id_book         =   label.id_book;

}

module.exports = Label;