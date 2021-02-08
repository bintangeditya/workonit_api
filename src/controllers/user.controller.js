
const UserModel = require('../models/user.model');

// get user by email
exports.getUserByEmail = (req, res)=>{
    console.log('get emp by id');
    UserModel.getUserByEmail(req.params.email, (err, user)=>{
        if(err)
        res.json({status: false, message: 'Problem', data: err});
        console.log('single employee data',user);
        res.json({status: true, message: 'Success', data: user});
    })
}

exports.login = (req, res)=>{
    const userReqData = new UserModel(req.body);
    console.log('userReqData', userReqData);
    UserModel.getUserByEmail(userReqData.email, (err, user)=>{
        if(err)
        res.json({status: false, message: 'Problem'});

        if(Object.keys(user).length)
        res.json({status: true, message: 'Sign In Successfully', data: user})
        else{
            UserModel.createUser(userReqData, (err, res)=>{
                if(err)
                res.json({status: false, message: 'Problem'});
                userReqData.id_user = res.insertId
                res.json({status: true, message: 'Sign Up Successfully', data: userReqData})
            })
        }
    })

}

