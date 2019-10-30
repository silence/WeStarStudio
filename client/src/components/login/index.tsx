import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'

export default class Login extends Component {
  state = {
    context: {}
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  getLogin = () => {
    Taro.cloud
      .callFunction({
        name: 'login',
        data: {}
      })
      .then(res => {
        console.log(res)
        this.setState({
          context: res.result
        })
      })
  }
  getConnectedWifi = () => {
    Taro.startWifi()
      .then(res => {
        console.log(res)
        Taro.getConnectedWifi()
          .then(res => console.log(res))
          .catch(res => console.log(res))
      })
      .catch(res => console.log(res))
    /**
     * starstudio-5g
     * "cc:81:da:f3:b5:d8"
     * starstudio
     *  "cc:81:da:f3:b5:d0"
     */
  }

  render() {
    return (
      <View className="index">
        <Button onClick={this.getLogin}>获取登录云函数</Button>
        <Text>context：{JSON.stringify(this.state.context)}</Text>
        <Button onClick={this.getConnectedWifi}>获取wifi信息</Button>
      </View>
    )
  }
}
