/// <reference path="../typings/node/node.d.ts"/>
/*
var xmlhttp = new XMLHttpRequest();
var data = 'name=0123&description=2&func_id=56f768fef7d1b9a0010471a6';
xmlhttp.open('POST','http://localhost:3000/DSA/if/add',true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send(data);
*/

exports.add = function(req, res, next) {
    var interfaceModel = global.dbConn.getModel('interface'); 
    var functionModel = global.dbConn.getModel('function'); 
    var name = req.body.name;
    var description = req.body.description;
    var method = req.body.method;

    var func_id = req.body.func_id;
    var func_name;
    var creator_id = req.session.user._id;
    var delete_flag = 'false';

    console.log(req.body);
    interfaceModel.findOne({"name": name, "func_id": func_id},function(err, data){
        if(err){ 
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(data){ 
            req.session.error = '接口已存在';
            res.send({
                "code":"2",
                "msg":'exist',
                "data":""
            });
        }else{ 
            functionModel.findOne({"_id": func_id},function(err, data){
                if(err){ 
                    // 接口返回对象 res.send();
                    res.send({
                        "code":"0",
                        "msg":err,
                        "data":""
                    });
                    console.log(err);
                } else{ 
                    func_name = data.name;

                    interfaceModel.create({ 
                        'name' : name,
                        'description' : description,
                        'method' : method,
                        'func_id' : func_id,
                        'func_name' : func_name,
                        'creator_id' : creator_id,
                        'delete_flag' : delete_flag
                    },function(err,data){ 
                        if (err) {
                            // 接口返回对象 res.send();
                            res.send({
                                "code":"0",
                                "msg":err,
                                "data":""
                            });
                            console.log(err);
                        } else {
                            res.send({
                                "code":"1",
                                "msg":"success",
                                "data":data
                            });
                        }
                    });
                }
            });
        }
    });
};


exports.detailReq = function(req, res, next) {
    var reqModel = global.dbConn.getModel('req');  
    var id = req.params.id;

    reqModel.find({"if_id": id, delete_flag:'false'},function(err, data){
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


exports.detailRes = function(req, res, next) {
    var resModel = global.dbConn.getModel('res');  
    var id = req.params.id;

    resModel.find({"if_id": id, delete_flag:'false'},function(err, data){
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


exports.edit = function(req, res, next) {
    var interfaceModel = global.dbConn.getModel('interface'); 
    // console.log(req.params.id);
    // console.log(req.body);
    var id = req.params.id;
    var params = req.body;
    var delete_flag = 'true';

    interfaceModel.findOneAndUpdate({"_id": id}, params, {new: false}, function(err, data){
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


exports.delete = function(req, res, next) {
    var interfaceModel = global.dbConn.getModel('interface'); 
    // console.log(req.params.id);
    var id = req.params.id;
    var delete_flag = 'true';

    interfaceModel.findOneAndUpdate({"_id": id}, {"delete_flag": delete_flag}, {new: false}, function(err, data){
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