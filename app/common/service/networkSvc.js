'use strict';

/**
 * 用户登录信息校验
 * app.get('/DSA/func||if/list');
 * app.post('/DSA/func||if/add');
 * app.get('/DSA/func||if/:id');
 * app.put('/DSA/func||if/:id/edit');
 * app.delete('/DSA/func||if/:id/delete');
 */
define(function(require, exports, module) {

    var networkSvc = angular.module('networkSvc', []);

    networkSvc.factory('networkSvc', ['$http', '$q', '$window', function($http, $q, $window) {

        return {
            // getList & getDeatil 一般返回res.code有-99 0和1，这里处理-99和1，其余算为default
            // resource = function || interface
            getList : function(resource) {
                var deferred = $q.defer(); // 声明承诺
                var url = 'DSA/' + resource + '/list';
                $http.get(url)
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
            },

            getDetail : function(resource, resource_id, type) {
                var deferred = $q.defer(); // 声明承诺
                var url;
                if (!type) {
                    url = 'DSA/' + resource + '/' + resource_id;
                } else {
                    url = 'DSA/' + resource + '/' + resource_id + '/' + type;
                }
                $http.get(url)
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
            },

            addItem : function(resource, data) {
                var deferred = $q.defer(); // 声明承诺
                var url = 'DSA/' + resource + '/add'; 
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
            },

            deleteItem : function(resource, resource_id) {
                var deferred = $q.defer(); // 声明承诺
                var url = 'DSA/' + resource + '/' + resource_id + '/delete';
                $http.delete(url)
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
            },

            updateItem : function(resource, data) {
                var deferred = $q.defer(); // 声明承诺
                var url = 'DSA/' + resource + '/edit';
                $http.put(url, data)
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
            },

            searchFunc : function(key) {
                var deferred = $q.defer(); // 声明承诺
                var url = 'DSA/search/func?key=' + key;
                $http.get(url)
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
            },

            searchIf : function(func_id, key) {
                var deferred = $q.defer(); // 声明承诺
                var url = 'DSA/search/if?key=' + key + '&func_id=' + func_id;
                $http.get(url)
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
        };

    }]);

    module.exports = networkSvc;

})

