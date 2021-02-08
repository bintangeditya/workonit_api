var dbConn  = require('../../config/db.config');


var Attachment = function(attachment){
    this.id_attachment   =   attachment.id_attachment;
    this.file            =   attachment.file;
    this.id_task         =   attachment.id_task;

}

module.exports = Attachment;