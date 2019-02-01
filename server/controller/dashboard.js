module.exports = {
    dashboard:async (ctx)=>{
        ctx.response.body = {
            result: true,
            code:200,
            data:{
                title:'这是Dashboard页面'
            }
        };
    }
};
