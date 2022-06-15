const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: [
        'vuetify'
    ],
    devServer: {
        host: '0.0.0.0',
        port: 8081,
        client: {
            //webSocketURL: 'ws://0.0.0.0:8080/ws',
        },
        proxy: {//增加一个api的前缀
            '/api': {
              target: "http://101.43.201.20:10910",//设置你调用的接口域名和端口号 别忘了加http
              changeOrigin: true,    //true表示实现跨域
              pathRewrite: {
                '^/api':''//这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'https://houduan.downline.cn/user/add'，直接写‘/api/user/add’即可
              }
            }
        },
    },

})
