const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('pages', resolve('src/pages'))
            .set('components', resolve('src/components'))
            .set('assets', resolve('src/assets'))
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.10.2:3000/',
                ws: true,
                changeOrigin:true,//允许跨域
                pathRewrite: {
                    '^/api': '/'
                }
            }
        },
    }
};