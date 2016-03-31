// controllers
var mainCtrl = require('../controllers/mainCtrl'),
    authCtrl = require('../controllers/authCtrl'),
    funcCtrl = require('../controllers/funcCtrl'),
    ifCtrl = require('../controllers/ifCtrl'),
    reqCtrl = require('../controllers/reqCtrl'),
    resCtrl = require('../controllers/resCtrl'),
    devCtrl = require('../controllers/devCtrl'),
    utilCtrl = require('../controllers/utilCtrl');

module.exports = function (app) {
    // ===================设置路由===================
    // :id 可以在 req.params.id获取到
    // POST的数据经过body-parser处理，可直接通过req.body.xxx获取
    // #anchor 锚点可以通过window.location.hash获取
    // Angular的路由形式为"/#"，可以防止浏览器刷新页面或者请求数据
    
    // 入口重定向
    app.get('/', authCtrl.index);

    // 登陆接口
    app.post('/api/login', authCtrl.login);
    app.get('/api/logout', authCtrl.logout);
    app.get('/api/isLogin', authCtrl.isLogin);

    // dev后门
    app.get('/dev/getUser', devCtrl.getUser);
    app.post('/dev/addUser', devCtrl.addUser);

    // 搜索接口
    app.get('/DSA/search/user', utilCtrl.searchUser);
    app.get('/DSA/search/func', utilCtrl.searchFunc);
    app.get('/DSA/search/if', utilCtrl.searchIf);

    // 功能接口
    app.get('/DSA/func/list', funcCtrl.list);
    app.post('/DSA/func/add', funcCtrl.add);
    app.get('/DSA/func/:id', funcCtrl.detail);// interface接口list
    // app.put('/DSA/func/:id/edit', funcCtrl.edit);
    app.delete('/DSA/func/:id/delete', funcCtrl.delete);

    // interface接口
    app.post('/DSA/if/add', ifCtrl.add);
    app.get('/DSA/if/:id/req', ifCtrl.detailReq);
    app.get('/DSA/if/:id/res', ifCtrl.detailRes);
    app.put('/DSA/if/:id/edit', ifCtrl.edit);
    app.delete('/DSA/if/:id/delete', ifCtrl.delete);

    // 请求参数req接口
    app.post('/DSA/req/add', reqCtrl.add);
    app.get('/DSA/req/:id', reqCtrl.detail);
    app.put('/DSA/req/:id/edit', reqCtrl.edit);
    app.delete('/DSA/req/:id/delete', reqCtrl.delete);

    // 返回参数res接口
    app.post('/DSA/res/add', resCtrl.add);
    app.get('/DSA/res/:id', resCtrl.detail);
    app.put('/DSA/res/:id/edit', resCtrl.edit);
    app.delete('/DSA/res/:id/delete', resCtrl.delete);

    // 外部请求接口 *通配
    app.get('/api/*', mainCtrl.get);
    app.post('/api/*', mainCtrl.post);

    // ==============================================

    // 通过通配符处理没有定义路由的请求(必须放在路由表的最后)
    app.get('*', function(req, res){
        res.send({
            "code":"-99",
            "msg":"Bad request!",
            "data":""
        });
    });
};