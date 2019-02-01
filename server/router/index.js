// 注意 require('koa-router') 返回的是函数:
const router = require('koa-router')();
const dashboardController = require('../controller/dashboard');
const loginController = require('../controller/login');

module.exports = (app)=>{
    //login获取token
    router.post('/login',loginController.login);
    //获取用户信息
    router.get('/userInfo',loginController.getUserInfo);

    //dashboard
    router.get('/dashboard',dashboardController.dashboard);

    app.use(router.routes(),router.allowedMethods());
};