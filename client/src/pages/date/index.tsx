import Taro, { useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

export default () => {
  useEffect(() => {
    Taro.navigateTo({
      url: '../login/index'
    })
  }, [])
  return (
    <View>
      <Text>date....</Text>
    </View>
  )
}
