/// <reference path="../typings/node/node.d.ts"/>
/*
// 获取用户列表
var xmlhttp = new XMLHttpRequest();
xmlhttp.open('GET','http://localhost:3000/dev/getUser',true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send();

// 添加用户
var xmlhttp = new XMLHttpRequest();
var user = "name=123&password=123";
xmlhttp.open('POST','http://localhost:3000/dev/addUser',true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send(user);
 */

exports.getUser = function(req, res, next) {
    var userModel = global.dbConn.getModel('user');  

    userModel.find({delete_flag:'false'},function(err, data){
        if(err){ 
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(!data){
            req.session.error = '用户不存在';
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


exports.addUser = function(req, res, next) {
    var userModel = global.dbConn.getModel('user');  
    var name = req.body.name;
    var password = req.body.password;

    userModel.create({'name':name, 'password':password, delete_flag:'false'},function(err, data){
        if(err){ 
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else{ 
            res.send({
                "code":"1",
                "msg":"success",
                "data":data
            });
        }
    });
};