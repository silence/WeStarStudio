import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Image, Text, OpenData, Button } from '@tarojs/components'
import { throttle } from '@/utils'
//import { AtActivityIndicator } from 'taro-ui'
import './index.scss'

export default () => {
  const [angle, setAngle] = useState(0)
  const [easterEggTimes, setEasterEggTimes] = useState(0)
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
      }, 100)
    )
    return () => {
      Taro.stopAccelerometer()
    }
  }, [])
  return (
    <View className="container">
      <View className="title">{easterEggTimes < 5 ? 'StarStudio' : '恭喜发现彩蛋🌈🥚'}</View>
      <View className="content">
        <View className="hd" style={{ transform: `rotateZ(${angle}deg)` }}>
          {easterEggTimes < 5 ? (
            <View className="logo" onClick={() => setEasterEggTimes(prev => prev + 1)}>
              <OpenData type="userAvatarUrl" default-avatar="../../static/images/logo.jpg" />
            </View>
          ) : (
            <Image className="logo" src="../../static/images/logo.jpg" />
          )}
          <Image className="wave" src="../../static/images/wave.png" mode="aspectFill" />
          <Image className="wave wave-bg" src="../../static/images/wave.png" mode="aspectFill" />
        </View>
        {/*后面会根据是否已绑定来更换跳转页面 */}
        <Button
          className="confirm-btn"
          openType="getUserInfo"
          onClick={() =>
            // Taro.navigateBack({
            //   delta: 1
            // })
            Taro.navigateTo({
              url: '../index/index'
            })
          }
        >
          <Text>绑定个人信息</Text>
        </Button>
      </View>
    </View>
  )
}
