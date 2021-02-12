var dbConn  = require('../../config/db.config');


var Task = function(task){
    this.id_task            =   task.id_task;
    this.title_task         =   task.title_task;
    this.description_task   =   task.description_task;
    this.due_date           =   task.due_date;
    this.id_lable           =   task.id_lable;
    this.id_book            =   task.id_book;

}


Task.getTaskByIdBookIdUser = (idBook,idUser, result)=>{
    console.log('getUserByIdBook');
    const longQuery = "SELECT  A.id_task, title_task, CASE WHEN B.done_status IS NULL THEN 0 WHEN B.done_status IS NOT NULL Then B.done_status END AS 'done_status' FROM (SELECT task.id_task,title_task, done_status FROM `task` LEFT OUTER JOIN task_user on task.id_task = task_user.id_task WHERE task_user.id_user IS NULL AND task.id_book = ?) AS A LEFT OUTER JOIN (SELECT task.id_task,done_status FROM `task` LEFT OUTER JOIN task_user on task.id_task = task_user.id_task WHERE task_user.id_user = ? AND task.id_book = ?) AS B ON A.id_task = B.id_task "
    dbConn.query(longQuery, [idBook,idUser,idBook], (err, res)=>{
        if(err){
            console.log('Error : getTaskByIdBookIdUser', err);
            result(true, err);
        }else{
            result(null, res);
        }
    })
}

Task.createTask = (taskReqData, result) =>{
    console.log('createTask');
    dbConn.query('INSERT INTO task SET ? ', taskReqData, (err, res)=>{
        if(err){
            console.log(err);
            result(true, err);
        }else{
            result(null, res)
        }
    })
}

Task.updateTask = (task, result)=>{
    dbConn.query("UPDATE task SET title_task =?,description_task =?,  due_date =? ,id_book =? WHERE id_task =?",
     [task.title_task,task.description_task,task.due_date,task.id_book,task.id_task], (err, res)=>{
        if(err){
            console.log(err);
            result(true, err);
        }else{
            result(null, res);
        }
    });
}

Task.deleteTask =   (id_task, result)=>{
    dbConn.query('DELETE FROM task WHERE id_task=?', [id_task], (err, res)=>{
        if(err){
            console.log('deleteTask',err);
            result(true, err);
        }else{
            result(null, res);
        }
    })
}

Task.getDetailTask = (id_task, result)=>{
    console.log('getDetailTask');
    dbConn.query('SELECT * FROM task WHERE id_task =?', id_task, (err, res)=>{
        if(err){
            console.log(err);
            result(true, err);
        }else{
            result(null, res);
        }
    })
}





module.exports = Task;