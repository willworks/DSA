"use strict";

/**
 * 程序主入口
 */
define(function(require, exports, module) {

    // 引入的service需要在主模块注入才能提供给其他的controllor使用
    require('common/service/networkSvc');
    require('common/service/authenticationSvc');
    require('common/directive/confirm');
    require('common/filter/filter');

    var app = angular.module('app', ['ngRoute', 'angular-lazyload', 'ngAnimate', 'authenticationSvc', 'networkSvc', 'mgcrea.ngStrap', 'confirm', 'filter']);

    //注册路由
    //resolve用于客户端的校验，而authenticationSvc.islogin()用于确认服务端的校验情况
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
        .when('/', {  
            redirectTo: '/function'
        })  
        .when('/login', {  
            name: "登陆",
            controller: 'loginCtrl',
            controllerUrl: './module/login/login_ctrl.js',
            templateUrl: './module/login/login_tpl.html'
        })
        .when('/function', {  
            name: "产品线/功能列表",
            controller: 'functionListCtrl',
            controllerUrl: './module/function/function_list_ctrl.js',
            templateUrl: './module/function/function_list_tpl.html',
            resolve: {
                auth: ["$q", "authenticationSvc", function($q, authenticationSvc) {
                    var userInfo = authenticationSvc.getUserInfo();
                    if (userInfo) {
                        return $q.when(userInfo);
                    } else {
                        return $q.reject({ authenticated: false });
                    }
                }]
            }
        })
        .when('/function/:id', {  
            name: "具体功能下接口列表",
            controller: 'interfaceListCtrl',
            controllerUrl: './module/interface/interface_list_ctrl.js',
            templateUrl: './module/interface/interface_list_tpl.html',
            resolve: {
                auth: ["$q", "authenticationSvc", function($q, authenticationSvc) {
                    var userInfo = authenticationSvc.getUserInfo();
                    if (userInfo) {
                        return $q.when(userInfo);
                    } else {
                        return $q.reject({ authenticated: false });
                    }
                }]
            }
        })
        .when('/interface/:id', {
            name:"修改接口",
            controller: 'interfaceEditCtrl',
            controllerUrl: './module/interface/interface_edit_ctrl.js',
            templateUrl: './module/interface/interface_edit_tpl.html',
            resolve: {
                auth: ["$q", "authenticationSvc", function($q, authenticationSvc) {
                    var userInfo = authenticationSvc.getUserInfo();
                    if (userInfo) {
                        return $q.when(userInfo);
                    } else {
                        return $q.reject({ authenticated: false });
                    }
                }]
            }
        })
        .when('/backdoor', {
            name:"开发专业后门",
            controller: 'backdoorCtrl',
            controllerUrl: './module/backdoor/backdoor_ctrl.js',
            templateUrl: './module/backdoor/backdoor_tpl.html'
        })
        .otherwise({
            redirectTo: '/function'
        });
    }]);

    app.run(['$rootScope', '$lazyload', '$window', '$http', '$location', '$log',
        function($rootScope, $lazyload, $window, $http, $location, $log) {
            //初始化按需加载
            $lazyload.init(app);
            app.register = $lazyload.register;

            // 监听route变化
            // BUG:无法显示$q.when()传递的值

            // 路由resolve
            $rootScope.$on("$routeChangeSuccess", function(userInfo) {
                $log.log(userInfo);
            });
            
            // 路由reject
			$rootScope.$on("$routeChangeError", function(event, current, previous, eventObj) {
				if (eventObj.authenticated === false) {
                    alert('请先登录');
					$location.path("/login");
				}
			});

        }
    ]);

    module.exports = app;
});
