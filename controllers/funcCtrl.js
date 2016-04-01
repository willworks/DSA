/// <reference path="../typings/node/node.d.ts"/>
/*
var xmlhttp = new XMLHttpRequest();
var data = 'name=0123&description=2&participant_id=56f71d41f36c46941ecc1484,56f71d41f36c46941ecc1484';
xmlhttp.open('POST','http://localhost:3000/DSA/func/add',true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send(data);
*/


// 查询我参与的功能 
// query={elete_flag:'false'}在服务端筛选好数据
exports.list = function(req, res, next) {
    var functionModel = global.dbConn.getModel('function');  
    var participant_id = req.session.user._id;

    // 查询子文档
    functionModel.find({'participant_id.user_id':participant_id, delete_flag:'false'},function(err, data){
        if(err){ 
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(!data){
            req.session.error = '功能不存在';
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


exports.add = function(req, res, next) {
    var functionModel = global.dbConn.getModel('function');  
    var name = req.body.name;
    var description = req.body.description;
    var creator_id = req.session.user.name;
    var participant_id = req.body.participant_id;
    var delete_flag = 'false';

    participant_id = participant_id.split(',');
    participant_id.push(req.session.user._id);
    console.log(participant_id);
    // 格式化提交参数
    var participant = [];
    for(var i=0; i<participant_id.length; i++) { 
        participant[i] = new Object();
        participant[i].user_id = participant_id[i];
        participant[i].read = "false";
        console.log(participant_id[i]);
    } 
    
    console.log('all' + participant);
    // 查询——创建——创建子文档
    functionModel.findOne({name: name},function(err, data){
        if(err){ 
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(data){ 
            // 对应name已经有数据
            req.session.error = '功能已存在';
            // 接口返回对象 res.send();
            res.send({
                "code":"2",
                "msg":"exist",
                "data":""
            });
        }else{ 
            functionModel.create({ 
                'name' : name,
                'description' : description,
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
                    // mongooseModel.update(conditions, update, options, callback)
                    functionModel.update(
                        {'_id':data._id}, 
                        {'$push':{'participant_id':{'$each': participant}}},
                        {upsert : true},
                        function(err){
                            if (err) {
                                // 不能更新子文档
                                functionModel.remove(
                                    {'_id':data._id},
                                    function(err, data){
                                        if(err){
                                            // 更新不了子文档且删除失败
                                            res.send({
                                                "code":"3",
                                                "msg":err,
                                                "data":""
                                            });
                                            console.log(err);
                                        } else {
                                            // 更新不了子文档但删除成功
                                            res.send({
                                                "code":"3",
                                                "msg":data,
                                                "data":""
                                            });
                                            console.log(data);
                                        }
                                    });

                            } else {
                                res.send({
                                    "code":"1",
                                    "msg":"success",
                                    "data":data
                                });
                            }
                        }
                    );

                }
            });
        }
    });

};


exports.detail = function(req, res, next) {
    var interfaceModel = global.dbConn.getModel('interface');  
    var id = req.params.id;
    var delete_flag = false;
    interfaceModel.find({"func_id": id, "delete_flag": delete_flag},function(err, data){
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
    var functionModel = global.dbConn.getModel('function'); 
    // console.log(req.params.id);
    // console.log(req.body);
    var id = req.params.id;
    var params = req.body;
    var delete_flag = 'true';

    functionModel.findOneAndUpdate({"_id": id}, params, {new: false}, function(err, data){
        if(err){ 
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(!data){
            req.session.error = '功能不存在';
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
    var functionModel = global.dbConn.getModel('function'); 
    // console.log(req.params.id);
    var id = req.params.id;
    var delete_flag = 'true';

    functionModel.findOneAndUpdate({"_id": id}, {"delete_flag": delete_flag}, {new: false}, function(err, data){
        if(err){ 
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(!data){
            req.session.error = '功能不存在';
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