import Taro, { useEffect, useState, useDidShow } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton, AtMessage, AtIcon } from 'taro-ui'
import { getConnectedWifi, checkIn } from '@/utils'
import './index.scss'

export default () => {
  let wifiBSSID, studentNumber
  const [wifi, setWifi] = useState('')
  const handleClick = () => {
    getWifi()
    if (wifiBSSID === 'cc:81:da:f3:b5:d8' || wifiBSSID === 'cc:81:da:f3:b5:d0') {
      // 上传数据库操作
      checkIn(studentNumber)
    } else {
      Taro.atMessage({
        message: '未连接工作室wifi',
        type: 'info'
      })
    }
  }
  const getWifi = () => {
    getConnectedWifi()
      .then(res => {
        console.log('页面内', res)
        setWifi(res.wifi.SSID)
        wifiBSSID = res.wifi.BSSID
      })
      .catch(err => {
        console.log('err', err)
        Taro.atMessage({
          message: err.errMsg.split(/(?<=[a-z])\s/)[1],
          type: 'info'
        })
        setWifi('暂未连接wifi')
      })
  }
  // useEffect(() => {
  //   Taro.getStorage({ key: 'userInfo' })
  //     .then(res => {
  //       console.log(res)
  //       getWifi()
  //     })
  //     .catch(() => Taro.navigateTo({ url: '../login/index' }))
  // }, [])
  useDidShow(() => {
    Taro.getStorage({ key: 'userInfo' })
      .then(res => {
        console.log(res)
        studentNumber = Number(JSON.parse(res.data).studentNumber)
        //
        checkIn(studentNumber)
        getWifi()
      })
      .catch(() => Taro.navigateTo({ url: '../login/index' }))
  })
  return (
    <View style={{ position: 'relative' }}>
      <View className="wifi-info">
        <AtIcon prefixClass="icon" value="wifi" size="18" className="icon" />
        <View className="wifi-text">
          当前连接WiFi:<View className="wifi">{wifi}</View>
        </View>
      </View>
      <View className="wrapper">
        <AtMessage />
        <AtButton className="button" type="secondary" onClick={() => handleClick()}>
          <View className="text">签到</View>
        </AtButton>
      </View>
    </View>
  )
}
