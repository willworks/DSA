/// <reference path="../typings/node/node.d.ts"/>
/*
var xmlhttp = new XMLHttpRequest();
xmlhttp.open('GET','http://localhost:3000/api',true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send();
*/

exports.get = function(req, res, next) {
    // =============================设置支持跨域=============================
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    // ======================================================================
    var function_name = req.originalUrl.split('/')[2];
    var interface_name = req.originalUrl.split('/')[3];
    var interfaceModel = global.dbConn.getModel('interface');  

    interfaceModel.findOne({"name": interface_name, "func_name": function_name},function(err, data){
        if(err){
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(!data){
            req.session.error = '接口不存在';
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


exports.post = function(req, res, next) {
    // =============================设置支持跨域=============================
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    // ======================================================================
    var function_name = req.originalUrl.split('/')[2];
    var interface_name = req.originalUrl.split('/')[3];
    var interfaceModel = global.dbConn.getModel('interface');  

    interfaceModel.findOne({"name": interface_name, "func_name": function_name},function(err, data){
        if(err){
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(!data){
            req.session.error = '接口不存在';
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

