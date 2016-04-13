/// <reference path="../typings/node/node.d.ts"/>


// 新建功能时候，选择用户列表数据
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


// query={elete_flag:'false'}在服务端筛选好数据
// http://localhost:3000/DSA/search/func?key=专题
exports.searchFunc = function(req, res, next) {
    var functionModel = global.dbConn.getModel('function');  
    var participant_id = req.session.user._id;

    // 对应mongodb中，可以直接使用 ‘/../’ 斜杠。但是在nodejs中，必须要使用RegExp，来构建正则表达式对象。
    var key = new RegExp(req.query.key);

    // 查询子文档
    functionModel.find({'participant_id.user_id':participant_id, delete_flag:'false', name:{$regex:key}},function(err, data){
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


// query={elete_flag:'false'}在服务端筛选好数据
// http://localhost:3000/DSA/search/if?key=专题
exports.searchIf = function(req, res, next) {
    var interfaceModel = global.dbConn.getModel('interface');  
    var participant_id = req.session.user._id;

    // 对应mongodb中，可以直接使用 ‘/../’ 斜杠。但是在nodejs中，必须要使用RegExp，来构建正则表达式对象。
    var key = new RegExp(req.query.key);
    var func_id = req.query.func_id;

    // 查询子文档
    interfaceModel.find({'func_id':func_id, delete_flag:'false', name:{$regex:key}},function(err, data){
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