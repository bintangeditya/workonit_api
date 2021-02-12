const TaskModel = require('../models/task.model');
const TaskUserModel = require('../models/taskUser.model');

exports.getTaskByIdBookIdUser = (req, res)=>{
    console.log('getTaskByIdBookIdUser');
    TaskModel.getTaskByIdBookIdUser(req.params.id_book,req.params.id_user, (err, tasks)=>{
        if(err) 
        res.json({status: false, message: 'Gagal'});
        res.json({status: true, message: 'Success', data: tasks});
    })
}

exports.createTask= (req, res)=>{
    const taskReqData = new TaskModel(req.body);
    console.log('taskReqData', taskReqData);
    TaskModel.createTask(taskReqData,(err,resTask)=>{
        if(err){
            console.log(err);
            res.json({status: false, message: 'Gagal'});
        }else{
            const userTaskReqData = new TaskUserModel({})
            userTaskReqData.id_task = resTask.insertId
            userTaskReqData.done_status = 0
            console.log('asdasdasd',userTaskReqData)
            TaskUserModel.createTaskUser(userTaskReqData,(err,resUserTask)=>{
                if(err){
                    console.log(err);
                    res.json({status: false, message: 'Gagal'});
                }else{
                    res.json({status: true, message: 'Success'});
                }
            })
        }
    })
}




exports.updateCheck = (req,res)=>{
    const taskUserReqData = new TaskUserModel(req.body)
    console.log('taskUserReqData',taskUserReqData)
    TaskUserModel.getTaskUserIdUserIdTask(req.body.id_user,req.body.id_task,(err,taskUser)=>{
        if(err)
        res.json({status: false, message: 'Gagal'});
        if(!Object.keys(taskUser).length){
            TaskUserModel.createTaskUser(taskUserReqData,(err,resCreate)=>{
                if(err)
                res.json({status: false, message: 'Gagal'});  
                res.json({status: true, message: 'Success'});
            })
        }else{
            taskUserReqData.id_task_user = taskUser[0].id_task_user
            console.log('taskUserReqData',taskUserReqData)
            TaskUserModel.updateTaskUser(taskUserReqData,(err,resUpdate)=>{
                if(err)
                res.json({status: false, message: 'Gagal'});  
                res.json({status: true, message: 'Success'});
            })
        }
    })
}

exports.deleteTask = (req, res)=>{
    TaskModel.deleteTask(req.params.id_task, (err, resDelete)=>{
        if(err)
        res.json({status: false, message: 'Gagal'});
        res.json({status: true, message: 'Success'});
    })
}

exports.updateTask = (req,res)=>{
    TaskModel.updateTask(req.body, (err, resUpdate)=>{
        if(err)
        res.json({status: false, message: 'Gagal'});
        res.json({status: true, message: 'Success'});
    })
}

exports.getDetailTask = (req,res)=>{
    TaskModel.getDetailTask(req.params.id_task, (err, task)=>{
        if(err)
        res.json({status: false, message: 'Gagal'});
        res.json({status: true, message: 'Success', data : task});
    })
}