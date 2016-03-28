/// <reference path="typings/angular/angular.d.ts"/>
'use strict';

/**
 * 定义首页控制器
 */
define(function(require, exports, module) {
    
    module.exports = function(app) {
        
        require('common/service/networkSvc');
        require('common/service/authenticationSvc');

        // auth为路由改变时的登陆标记
        app.register.controller('interfaceEditCtrl', function($scope, $window, $http, $rootScope, networkSvc, $location, auth, authenticationSvc, $log, $modal, $select, $alert) {


            // 服务端和客户端的双重校验
            // 每个页面加载前执行确认接口权限
            authenticationSvc.isLogin()
            .then(
                // 安全路由确认客户端已经登陆，isLogin()确认服务器端登陆
                function(){
                    // -------------------------混乱数据区-------------------------
                    $rootScope.title = "Interface Page";
                    $scope.id = $window.localStorage["interface_id"];
                    $scope.param = "if";
                    $scope.uname = authenticationSvc.getUserInfo().uname;
                    $scope.participant = false;
                    // -------------------------混乱数据区-------------------------
                    

                    //=============================start 页面主逻辑位置=============================
                    /*
                     * 页面渲染逻辑在这里，确保在请求逻辑搞定之后再开始
                     */

                    $scope.init = function () {
                        console.log($scope.id);
                        // 页面加载请求数据
                        networkSvc.getDetail('if', $scope.id)
                        .then(
                            // networkSvc.getDetail() resolve接口
                            function(res){
                                switch(res.data.code){
                                    case '-99':
                                        alert('请先登录');
                                        $location.path("/login");
                                        break;
                                    case '0':
                                        alert('失败了，程序猿在奋力为你解决');
                                        break;
                                    case '1':
                                        $scope.item = res.data.data;
                                        console.log($scope.item);
                                        break;
                                    default:
                                        $scope.info = '失败了，程序猿在奋力为你解决';
                                        break;
                                }
                            },
                            // networkSvc.getDetail() reject接口
                            function(err){
                                alert('失败了，程序猿在奋力为你解决');
                                $log.log(err);
                            },
                            // networkSvc.getDetail() notify接口
                            function(proc){
                                // loading
                            }
                        );
                    }
                    $scope.init();

                    $scope.cancelEdit = function () {

                    }

                    $scope.updateItem = function () {
                        
                    }
                    
                    //=============================end 页面主逻辑位置=============================
                },
                // 客户端以及登陆而服务器端未登录
                function(){
                    alert('请先登录');
                    $location.path("/login");
                }
            );


            // 登出操作
            $scope.logout = function () {
                authenticationSvc.logout()
                .then(
                    // authenticationSvc.logout() resolve接口
                    function(res){
                        switch(res.data.code){
                            case '1':
                                $location.path("/login");
                                break;
                            default:
                                alert('失败了，程序猿在奋力为你解决');
                                break;
                        }
                    },
                    // authenticationSvc.logout() reject接口
                    function(err){
                        alert('失败了，程序猿在奋力为你解决');
                        $log.log(err);
                    },
                    // authenticationSvc.logout() notify接口
                    function(proc){
                        // loading
                    }
                );
            }

        });
    }
});

