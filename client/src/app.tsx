import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro'
import Index from './pages/index'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/date/index',
      'pages/login/index',
      'pages/index/index',
      'pages/aftifact/index',
      'pages/ground/index',
      'pages/arrivals/index',
      'pages/user/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#7acfa6',
      navigationBarTitleText: '星辰工作室',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      selectedColor: '#4cc9ac',
      list: [
        {
          pagePath: 'pages/date/index',
          text: '日程',
          iconPath: 'static/icon/date.png',
          selectedIconPath: 'static/icon/date-active.png'
        },
        {
          pagePath: 'pages/aftifact/index',
          text: '神器',
          iconPath: 'static/icon/aftifact.png',
          selectedIconPath: 'static/icon/aftifact-active.png'
        },
        {
          pagePath: 'pages/ground/index',
          text: '广场',
          iconPath: 'static/icon/ground.png',
          selectedIconPath: 'static/icon/ground-active.png'
        },
        {
          pagePath: 'pages/arrivals/index',
          text: '直达',
          iconPath: 'static/icon/arrivals.png',
          selectedIconPath: 'static/icon/arrivals-active.png'
        },
        {
          pagePath: 'pages/user/index',
          text: '我的',
          iconPath: 'static/icon/user.png',
          selectedIconPath: 'static/icon/user-active.png'
        }
      ]
    },
    cloud: true
  }

  componentDidMount() {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init()
    }
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Index />
  }
}

Taro.render(<App />, document.getElementById('app'))
