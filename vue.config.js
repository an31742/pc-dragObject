module.exports = {
  // 基本路径
  publicPath: '/',
  outputDir: 'drag-dist',
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    // port: 8088,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        // target: `http://192.168.200.197:8088`, // wuzheng
        // target: `http://10.122.202.132:8088`,
        // target: `http://10.245.5.34:8087`, // 实验树形控件测试地址
        // target: `http://127.0.0.1:8089`, // 本地之址
        // target: `http://192.168.1.133:8088`, // zhouchao
        // target: `http://10.122.202.129:8089/cloudForm`, // 周超
        // target: `http://10.122.202.127:8089/`, // 王鼎
        // target: `http://10.122.202.130:8089/cloudForm`, // 李飞
        target: `http://10.245.5.34:8089/cloudForm`, // 服务器
        // target: `http://10.122.202.126:8089/cloudForm/`, // 吴正
        // target: `http://http://10.245.2.105/cloudForm_trial/`, // 线上测试

        changeOrigin: true,
        ws: false,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  }
}
