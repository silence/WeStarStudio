import Taro, { useDidShow, useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { checkInRecord } from '@/utils'
import { AtList, AtListItem, AtActivityIndicator } from 'taro-ui'
import './index.scss'

interface ICheckInRecord {
  avatarUrl: string
  checkInTime: Date
  name: string
  nickName: string
}

export default () => {
  const [list, setList] = useState<Array<ICheckInRecord>>([])
  useDidShow(async () => {
    let studentNumber
    await Taro.getStorage({ key: 'userInfo' })
      .then(res => {
        console.log(res)
        studentNumber = Number(JSON.parse(res.data).studentNumber)
      })
      .catch(() => Taro.navigateTo({ url: '../login/index' }))
    checkInRecord(studentNumber)
      .then(res => {
        console.log(res)
        const { result } = res
        setList(result)
      })
      .catch(err => console.log(err))
  })
  return (
    <View>
      <AtList>
        <AtListItem title="工作室本周签到记录" />
        {list.length === 0 ? (
          <View style={{ position: 'absolute', width: '100vw', height: '100vh' }}>
            <AtActivityIndicator mode="center" content="Loading..."></AtActivityIndicator>
          </View>
        ) : (
          list.map(curr => {
            return (
              <AtListItem
                title={curr.nickName}
                note={curr.name}
                thumb={curr.avatarUrl}
                extraText={new Date(curr.checkInTime).toLocaleString()}
              />
            )
          })
        )}
        {}
      </AtList>
    </View>
  )
}
