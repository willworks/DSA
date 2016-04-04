/// <reference path="../typings/node/node.d.ts"/>
/// 
exports.listUser = function(req, res, next) {
    var userModel = global.dbConn.getModel('user');  

    // 查询子文档
    userModel.find({delete_flag:'false'}, '_id, name', function(err, data){
        if(err){ 
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(!data){
            req.session.error = '通知不存在';
            res.send({
                "code":"-2",
                "msg":"Not Found",
                "data":""
            });
        }else{ 
            res.send({
                "code":"1",
                "msg":"success",
                "data":data
            });
        }
    });
};

exports.searchUser = function(req, res, next) {
    var userModel = global.dbConn.getModel('user');  
    var user_id = req.session.user._id;

    // 查询子文档
    userModel.find({'user_id.userId':user_id, delete_flag:'false'},function(err, data){
        if(err){ 
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(!data){
            req.session.error = '通知不存在';
            res.send({
                "code":"-2",
                "msg":"Not Found",
                "data":""
            });
        }else{ 
            res.send({
                "code":"1",
                "msg":"success",
                "data":data
            });
        }
    });
};


exports.searchFunc = function(req, res, next) {
    var userModel = global.dbConn.getModel('user');  
    var user_id = req.session.user._id;

    // 查询子文档
    userModel.find({'user_id.userId':user_id, delete_flag:'false'},function(err, data){
        if(err){ 
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(!data){
            req.session.error = '通知不存在';
            res.send({
                "code":"-2",
                "msg":"Not Found",
                "data":""
            });
        }else{ 
            res.send({
                "code":"1",
                "msg":"success",
                "data":data
            });
        }
    });
};


exports.searchIf = function(req, res, next) {
    var userModel = global.dbConn.getModel('user');  
    var user_id = req.session.user._id;

    // 查询子文档
    userModel.find({'user_id.userId':user_id, delete_flag:'false'},function(err, data){
        if(err){ 
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(!data){
            req.session.error = '通知不存在';
            res.send({
                "code":"-2",
                "msg":"Not Found",
                "data":""
            });
        }else{ 
            res.send({
                "code":"1",
                "msg":"success",
                "data":data
            });
        }
    });
};
