/** 
    Document   : DSA
    Created on : 2016.3
    Author     : Kevin Zhong
    License    : MIT
    github     : https://github.com/willworks/DSA
    Description: A Data Simulation System for Application Programming Interface
    Copyright (c) 2016 Kevin Zhong
*/
var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    routes = require('./routes/routes'),
    middlewares = require('./routes/middlewares');

// 数据模型
global.dbConn = require('./models/dbConn');
global.db = mongoose.connect("mongodb://localhost:27017/DSA");

// __dirname为当前命令所在路径
global.root = __dirname;

// 中间件入口文件
middlewares(app);

// 自定义路由入口文件
routes(app);

module.exports = app;
