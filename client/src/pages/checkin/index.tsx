import Taro, { useEffect, useState, useDidShow } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton, AtMessage, AtIcon } from 'taro-ui'
import { getConnectedWifi, checkIn } from '@/utils'
import './index.scss'

export default () => {
  let wifiBSSID
  const [studentNumber, setStudentNumber] = useState<number>()
  const [wifi, setWifi] = useState('')
  const [checkInState, setCheckInState] = useState<boolean | 'initial'>('initial')
  const [loading, setLoading] = useState(false)
  const handleClick = async () => {
    console.log(studentNumber)
    await getWifi()
    if (
      // 清水河
      wifiBSSID === 'cc:81:da:f3:b5:d8' ||
      wifiBSSID === 'cc:81:da:f3:b5:d0' ||
      // 沙河
      wifiBSSID === 'a0:63:91:87:0b:fa' ||
      wifiBSSID === 'a0:63:91:87:0b:fb' || 
      wifiBSSID === 'a0:63:91:87:0b:fc'
    ) {
      // 上传数据库操作
      checkIn(studentNumber as number)
        .then(res => {
          setCheckInState(true)
        })
        .catch(err => {
          console.log(err)
          Taro.atMessage({
            message: '距离上一次签到时间过短',
            type: 'info'
          })
          setCheckInState(false)
        })
        .finally(() => setLoading(false))
      setLoading(true)
    } else {
      Taro.atMessage({
        message: '未连接工作室wifi',
        type: 'info'
      })
    }
  }
  const getWifi = async () => {
    await getConnectedWifi()
      .then(res => {
        console.log('页面内', res)
        setWifi(res.wifi.SSID)
        wifiBSSID = res.wifi.BSSID
      })
      .catch(err => {
        console.log('err', err)
        Taro.atMessage({
          message: err.errMsg.split(/fail:?\s?/)[1],
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
        setStudentNumber(Number(JSON.parse(res.data).studentNumber))
        //for test
        // checkIn(studentNumber)
        //   .then(res => console.log(res))
        //   .catch(err => console.log(err, 'err'))
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
        <AtButton
          className="button"
          type="secondary"
          disabled={checkInState === 'initial' ? false : true}
          loading={loading}
          onClick={() => handleClick()}
        >
          <View className="text">
            {checkInState === 'initial' ? '签到' : checkInState ? '签到成功' : '签到失败'}
          </View>
        </AtButton>
      </View>
    </View>
  )
}
