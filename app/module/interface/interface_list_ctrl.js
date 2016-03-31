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
        app.register.controller('interfaceListCtrl', function($scope, $window, $http, $rootScope, networkSvc, $location, auth, authenticationSvc, $log, $modal, $select, $alert) {


            // 服务端和客户端的双重校验
            // 每个页面加载前执行确认接口权限
            authenticationSvc.isLogin()
            .then(
                // 安全路由确认客户端已经登陆，isLogin()确认服务器端登陆
                function(){
                    // -------------------------混乱数据区-------------------------
                    $rootScope.title = "Interface Page";
                    $scope.id = $window.localStorage["function_id"];

                    $scope.param = "if";
                    $scope.uname = authenticationSvc.getUserInfo().uname;
                    $scope.functionShow = false;
                    $scope.interfaceShow = true;
                    // -------------------------混乱数据区-------------------------
                    

                    //=============================start 页面主逻辑位置=============================
                    /*
                     * 页面渲染逻辑在这里，确保在请求逻辑搞定之后再开始
                     */

                    $scope.init = function () {
                        // 页面加载请求数据
                        networkSvc.getDetail('func', $scope.id)
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


                    // http://mgcrea.github.io/angular-strap/

                    $scope.dialog = {
                        scope: $scope,
                        title : '新建接口',
                        name : ' ', 
                        description : ' ', 
                        method : ' ',
                        animation : "am-fade-and-slide-top",
                        template : "common/directive/dialog.html",
                    };

                    // 弹出新增页面
                    $scope.addItemPanel = function() {
                        $modal($scope.dialog).show;
                    };

                    // 新增内容
                    $scope.addItem = function (modal) {
                        var data = {
                            "name":$scope.dialog.name,
                            "description":$scope.dialog.description,
                            "method":$scope.dialog.method,
                            "func_id":$scope.id
                        };
                        console.log($scope.dialog);
                        networkSvc.addItem($scope.param,data)
                        .then(
                            // networkSvc.addItem() resolve接口
                            function(res){
                                switch(res.data.code){
                                    case '-99':
                                        alert('请先登录');
                                        $location.path("/login");
                                        break;
                                    case '1':
                                        modal.$hide();
                                        networkSvc.getDetail('func', $scope.id)
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
                                                        break;
                                                    default:
                                                        alert('失败了，程序猿在奋力为你解决');
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

                                        // 将最新插入的数据插入到repeat数组里动态改变
                                        // $scope.item.push(res.data.data);
                                        break;
                                    case '2':
                                        alert('标题已经存在');
                                        break;
                                    case '3':
                                        alert('数据插入失败');
                                        break;
                                    default:
                                        alert('失败了，程序猿在奋力为你解决');
                                        break;
                                }
                            },
                            // networkSvc.addItem() reject接口
                            function(err){
                                alert('失败了，程序猿在奋力为你解决');
                                $log.log(err);
                            },
                            // networkSvc.addItem() notify接口
                            function(proc){
                                // loading
                            }
                        );
                    }

                    $scope.showDetail = function($index, itemId) {
                        $location.path("/interface/" + itemId);
                        $window.localStorage["interface_id"] = itemId;
                    };

                    $scope.aside = {
                        scope: $scope,
                        title : '更新返回参数',
                        name : ' ', 
                        description : ' ', 
                        func_id : ' ',
                        animation : "am-fade-and-slide-top",
                        template : "common/directive/aside.html",
                    };

                    // 弹出编辑页面
                    $scope.eidtItemPanel = function(id) {
                        $modal($scope.aside).show;
                        networkSvc.getDetail('if', id, 'res')
                        .then(
                            // networkSvc.getDetail() resolve接口
                            function(res){
                                console.log(res);
                                switch(res.data.code){
                                    case '-99':
                                        alert('请先登录');
                                        $location.path("/login");
                                        break;
                                    case '0':
                                        alert('失败了，程序猿在奋力为你解决');
                                        break;
                                    case '1':
                                        $scope.ress = res.data.data;
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
                    };

                    $scope.deleteItemPanel = function (index, item_id) {
                        $scope.confirm = true;
                        $scope.data = {
                            'index' : index,
                            'item' : item_id
                        }
                    }

                    $scope.deleteItem = function () {
                        networkSvc.deleteItem($scope.param, $scope.data.item)
                        .then(
                            // networkSvc.deleteItem() resolve接口
                            function(res){
                                switch(res.data.code){
                                    case '-99':
                                        alert('请先登录');
                                        $location.path("/login");
                                        break;
                                    case '1':
                                        // 删除数组实时更改
                                        $scope.item.splice($scope.data.index,1);
                                        $scope.confirm = false;
                                        break;
                                    default:
                                        alert('失败了，程序猿在奋力为你解决');
                                        break;
                                }
                            },
                            // networkSvc.deleteItem() reject接口
                            function(err){
                                alert('失败了，程序猿在奋力为你解决');
                                $log.log(err);
                            },
                            // networkSvc.deleteItem() notify接口
                            function(proc){
                                // loading
                            }
                        );
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

