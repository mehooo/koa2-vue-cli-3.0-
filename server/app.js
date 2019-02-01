//我们导入的是class，因此用大写的Koa表示
const Koa = require('koa');
//创建一个Koa对象表示web app本身
const app = new Koa();
const bodyparser = require('koa-bodyparser');
// 新增部分处理跨域
const cors = require('koa2-cors');
const logger = require('koa-logger');
//导入路由
const router = require('./router/index');

// 新增部分处理跨域
app.use(cors());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
}));

// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

//路由
router(app);

//设置监听端口
app.listen(3000);
console.log('koa2 is starting at port 3000');