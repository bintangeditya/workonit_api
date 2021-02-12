var dbConn  = require('../../config/db.config');


var TaskUser = function(taskUser){
    this.id_task_user       =   taskUser.id_task_user;
    this.id_task            =   taskUser.id_task ;
    this.id_user            =   taskUser.id_user;
    this.done_status        =   taskUser.done_status;

}

TaskUser.getTaskUserIdUserIdTask = (id_user,id_task, result)=>{
    console.log('userReqData');
    dbConn.query('SELECT * FROM task NATURAL JOIN task_user WHERE id_user =? AND id_task=?',[id_user,id_task], (err, res)=>{
        if(err){
            console.log(err);
            result(true, err);
        }else{
            result(null, res);
        }
    })
}

TaskUser.createTaskUser = (taskUserReqData, result) =>{
    console.log('createTaskUser');
    dbConn.query('INSERT INTO task_user SET ? ', taskUserReqData, (err, res)=>{
        if(err){
            console.log(err);
            result(true, err);
        }else{
            result(null, res)
        }
    })
}

TaskUser.updateTaskUser = (taskUserReqData,result) =>{
    dbConn.query("UPDATE task_user SET id_task =?, id_user =?, done_status =? WHERE id_task_user =?", [taskUserReqData.id_task, taskUserReqData.id_user,taskUserReqData.done_status,taskUserReqData.id_task_user], (err, res)=>{
        if(err){
            console.log(err);
            result(true, err);
        }else{
            result(null, res);
        }
    });
}

module.exports = TaskUser;