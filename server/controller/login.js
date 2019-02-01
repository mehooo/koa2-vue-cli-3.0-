const userMap = {
    admin: {
        roles: ['admin'],
        token: '000000',
        introduction: '我是超级管理员',
        avatar: 'https://raw.githubusercontent.com/mgbq/nx-admin/master/src/assets/img/home/logo.png',
        username: 'Super Admin'
    },
    editor: {
        roles: ['editor'],
        token: '111111',
        introduction: '我是编辑',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        username: 'Normal Editor'
    }
}
module.exports = {
    login:async (ctx)=>{
        ctx.response.body = {
            result: true,
            code: 200,
            data: {
                token:'000000'
            }
        };
    },
    getUserInfo:async (ctx)=>{
        let req_query = ctx.request.query;
        let data;
        if(req_query.token === '000000'){
            data = userMap['admin']
        }
        if(req_query.token === '111111'){
            data = userMap['editor']
        }

        ctx.response.body = {
            result: true,
            code: 200,
            data: data
        };
    },

};