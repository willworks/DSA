/// <reference path="../typings/node/node.d.ts"/>
/* 请求格式 api/function_name/interface_name
var xmlhttp = new XMLHttpRequest();
xmlhttp.open('GET','http://localhost:3000/api/mst/getUserInfo',true);
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
    var resModel = global.dbConn.getModel('res');  

    resModel.find({"if_name": interface_name, "func_name": function_name, "delete_flag":'false'},function(err, data){
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
            // 结果格式化处理
            var resData = {};
            var key, val;
            for (var item in data) {
                key = data[item].name;
                val = data[item].value;
                resData[key] = val;
            }
            console.log(resData);

            res.send({
                "code":"1",
                "msg":"success",
                "data":resData
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
    var resModel = global.dbConn.getModel('res');  

    resModel.find({"if_name": interface_name, "func_name": function_name, "delete_flag":'false'},function(err, data){
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
            // 结果格式化处理
            var resData = {};
            var key, val;
            for (var item in data) {
                key = data[item].name;
                val = data[item].value;
                resData[key] = val;
            }
            console.log(resData);

            res.send({
                "code":"1",
                "msg":"success",
                "data":resData
            });
        }
    });
};

