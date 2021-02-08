const TaskModel = require('../models/task.model');
const TaskUserModel = require('../models/taskUser.model');

exports.getTaskByIdBookIdUser = (req, res)=>{
    console.log('getTaskByIdBookIdUser');
    TaskModel.getTaskByIdBookIdUser(req.params.id_book,req.params.id_user, (err, tasks)=>{
        if(err) 
        res.json({status: false, message: 'Problem'});
        res.json({status: true, message: 'Success', data: tasks});
    })
}

exports.createTask= (req, res)=>{
    const taskReqData = new TaskModel(req.body);
    console.log('taskReqData', taskReqData);

    TaskModel.createTask(taskReqData,(err,resTask)=>{
        if(err){
            console.log(err);
            res.json({status: false, message: 'Problem'});
        }else{
            const userTaskReqData = new TaskUserModel({})
            userTaskReqData.id_task = resTask.insertId
            userTaskReqData.done_status = 0
            console.log('asdasdasd',userTaskReqData)
            TaskUserModel.createTaskUser(userTaskReqData,(err,resUserTask)=>{
                if(err){
                    console.log(err);
                    res.json({status: false, message: 'Problem'});
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
    TaskUserModel.u
}