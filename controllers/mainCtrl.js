/// <reference path="../typings/node/node.d.ts"/>


exports.get = function(req, res, next) {
    // =============================设置支持跨域=============================
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    // ======================================================================
    res.send({
        "code":"1",
        "msg":"Is login in",
        "data":""
    });
};


exports.post = function(req, res, next) {
    // =============================设置支持跨域=============================
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    // ======================================================================
    res.send({
        "code":"1",
        "msg":"Logout success",
        "data":""
    });
};

