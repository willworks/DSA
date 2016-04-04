'use strict';

/**
 * 定义登陆控制器
 */
define(function(require, exports, module) {
	
    module.exports = function(app) {
    	
        require('common/service/networkSvc');
        require('common/service/authenticationSvc');
        
        app.register.controller('backdoorCtrl', function($scope, $http, $rootScope, networkSvc, authenticationSvc, $location, $log, $timeout, $q) {
            
            // -------------混乱数据区-------------
            $rootScope.title = "backdoor";
            // -------------混乱数据区-------------

            // promise
            $scope.backdoor = function(data) {
                var deferred = $q.defer(); // 声明承诺
                var url = 'dev/addUser'; 
                $http.post(url, data)
                .then(
                    function(res) {
                        deferred.resolve(res);
                    }, 
                    function(err) {
                        deferred.reject(err);
                    },
                    function(proc) {
                        deferred.notify('processing');
                    }
                );
                return deferred.promise;
            }
            
            $scope.addUser = function () {
                var data = {
                    "name": $scope.uname,
                    "password": $scope.upwd
                }
                $scope.backdoor(data)
                .then(
                    function(res){
                        $scope.infoShow = true;
                        switch(res.data.code){
                            case '1':
                                $scope.info = '添加成功';
                                $scope.infoSuccess = true;
                                break;
                            default:
                                $scope.info = '失败了，程序猿在奋力为你解决';
                                $scope.infoSuccess = false;
                                break;
                        }
                    },
                    function(err){
                    	$scope.infoShow = true;
                        $scope.info = '失败了，程序猿在奋力为你解决';
                        $scope.infoSuccess = false;
                    },
	                function(proc){
	                    // loading
	                }
                )
            }

        });
    }
});