/// <reference path="../typings/node/node.d.ts"/>
/*
var xmlhttp = new XMLHttpRequest();
var data = 'name=name&type=int&meaning=姓名&comment=中文英文都行&if_id=56f91600c0da4ef4029a360f&value=钟汉津';
xmlhttp.open('POST','http://localhost:3000/DSA/req/add',true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send(data);
*/

exports.add = function(req, res, next) {
    var reqModel = global.dbConn.getModel('req'); 
    var interfaceModel = global.dbConn.getModel('interface'); 
    var name = req.body.name;
    var type = req.body.type;
    var meaning = req.body.meaning;
    var comment = req.body.comment;
    var if_id = req.body.if_id;
    var if_name;
    var value = req.body.value;
    var delete_flag = 'false';

    reqModel.findOne({"name": name, "if_id": if_id},function(err, data){
        if(err){ 
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(data){ 
            req.session.error = '参数已存在';
            res.send({
                "code":"2",
                "msg":'exist',
                "data":""
            });
        }else{ 
            interfaceModel.findOne({"_id": if_id},function(err, data){
                if(err){ 
                    // 接口返回对象 res.send();
                    res.send({
                        "code":"0",
                        "msg":err,
                        "data":""
                    });
                    console.log(err);
                } else{ 
                    if_name = data.name;

                    reqModel.create({ 
                        'name' : name,
                        'type' : type,
                        'meaning' : meaning,
                        'comment' : comment,
                        'if_id' : if_id,
                        "if_name" : if_name,
                        'value' : value,
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


exports.detail = function(req, res, next) {
    var reqModel = global.dbConn.getModel('req');  
    var id = req.params.id;

    reqModel.findOne({"_id": id},function(err, data){
        if(err){
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(!data){
            req.session.error = '参数不存在';
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
    var reqModel = global.dbConn.getModel('req'); 
    // console.log(req.params.id);
    // console.log(req.body);
    var id = req.params.id;
    var params = req.body;
    var delete_flag = 'true';

    reqModel.findOneAndUpdate({"_id": id}, params, {new: false}, function(err, data){
        if(err){ 
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(!data){
            req.session.error = '参数不存在';
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
    var reqModel = global.dbConn.getModel('req'); 
    // console.log(req.params.id);
    var id = req.params.id;
    var delete_flag = 'true';

    reqModel.findOneAndUpdate({"_id": id}, {"delete_flag": delete_flag}, {new: false}, function(err, data){
        if(err){ 
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(!data){
            req.session.error = '参数不存在';
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