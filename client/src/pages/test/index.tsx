import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Image, Text, OpenData } from '@tarojs/components'
//import { Header, Course, ICourse } from '@/components'
import { throttle } from '@/utils'
//import { AtActivityIndicator } from 'taro-ui'
import './index.scss'

export default () => {
  const [angle, setAngle] = useState(0)
  useEffect(() => {
    Taro.startAccelerometer({
      interval: 'ui'
    })
    Taro.onAccelerometerChange(
      throttle(res => {
        let accelerometerAngle = -(res.x * 30).toFixed(1)
        // 边缘修正
        if (accelerometerAngle > 14) {
          accelerometerAngle = 14
        } else if (accelerometerAngle < -14) {
          accelerometerAngle = -14
        }
        if (angle !== accelerometerAngle) setAngle(accelerometerAngle)
        console.log(this.angle)
      }, 100)
    )
    return () => {
      Taro.stopAccelerometer()
    }
  }, [])
  return (
    <View className="container">
      <View className="title">StarStudio</View>
      <View className="content">
        <View className="hd" style={{ transform: `rotateZ(${angle}deg)` }}>
          <View className="logo">
            <OpenData type="userAvatarUrl" default-avatar="../../static/images/logo.png" />
          </View>
          <Image className="wave" src="../../static/images/wave.png" mode="aspectFill" />
          <Image className="wave wave-bg" src="../../static/images/wave.png" mode="aspectFill" />
        </View>

        <View className="confirm-btn">
          <Text>进入小程序</Text>
        </View>
      </View>
    </View>
  )
}
