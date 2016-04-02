/// <reference path="../typings/node/node.d.ts"/>
/*
var xmlhttp = new XMLHttpRequest();
var data = 'name=0123&description=2&func_id=56f768fef7d1b9a0010471a6';
xmlhttp.open('POST','http://localhost:3000/DSA/req/add',true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send(data);
*/

exports.add = function(req, res, next) {
    var resModel = global.dbConn.getModel('res'); 
    var interfaceModel = global.dbConn.getModel('interface'); 
    var functionModel = global.dbConn.getModel('function'); 
    var name = req.body.name;
    var type = req.body.type;
    var meaning = req.body.meaning;
    var comment = req.body.comment;
    var if_id = req.body.if_id;
    var if_name;
    var func_id = req.body.func_id;
    var func_name;
    var value = req.body.value;
    var delete_flag = 'false';

    resModel.findOne({"name": name, "if_id": if_id, "delete_flag":'false'},function(err, data){
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

                            resModel.create({ 
                                'name' : name,
                                'type' : type,
                                'meaning' : meaning,
                                'comment' : comment,
                                'if_id' : if_id,
                                "if_name" : if_name,
                                'func_id' : func_id,
                                "func_name" : func_name,
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

        }
    });
};


exports.edit = function(req, res, next) {
    var resModel = global.dbConn.getModel('res'); 
    // 遍历回传的数组，依次更新
    var params = req.body;
    var flag = 1;
    var i = params.length;
    console.log(params);
    
    while(i--) {
        console.log(i);
        resModel
            .findOneAndUpdate({"_id": params[i].id}, {"value": params[i].value}, {new: false}, function(err, data){
                if(err){ 
                    console.log(err);
                }else if(data){ 
                    console.log(data);
                }
            })
    }
    res.send({
        "code":"1",
        "msg":"success",
        "data":""
    });
};


exports.delete = function(req, res, next) {
    var resModel = global.dbConn.getModel('res'); 
    // console.log(req.params.id);
    var id = req.params.id;
    var delete_flag = 'true';

    resModel.findOneAndUpdate({"_id": id}, {"delete_flag": delete_flag}, {new: false}, function(err, data){
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