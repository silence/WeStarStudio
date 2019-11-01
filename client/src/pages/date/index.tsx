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
  let studentNumber: number
  useDidShow(async () => {
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
                extraText={`${new Date(curr.checkInTime).getMonth() + 1}/${new Date(
                  curr.checkInTime
                ).getDate()}/${new Date(curr.checkInTime).getFullYear()} ${new Date(
                  curr.checkInTime
                ).getHours()}:${new Date(curr.checkInTime).getMinutes()}:${new Date(
                  curr.checkInTime
                ).getSeconds()}`}
              />
            )
          })
        )}
        {}
      </AtList>
    </View>
  )
}
