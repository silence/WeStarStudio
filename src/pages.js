module.exports = [
  {
    path: 'pages/index' // 页面路径，同时是 vue 文件相对于 src 的路径
  },
  {
    path: 'leave/leave',
    subPackage: true
  },

  {
    path: 'pages/counter'
  },
  {
    path: 'packageA/logs',
    subPackage: true,
    config: {
      // 页面配置，即 page.json 的内容
      navigationBarTitleText: '查看启动日志'
    }
  },
  {
    path: 'pages/login',
    config: {
      navigationBarTitleText: '登陆页'
    }
  }
]
