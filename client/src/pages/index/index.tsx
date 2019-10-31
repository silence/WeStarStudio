import Taro, { useState } from '@tarojs/taro'
import { Picker, View, Label } from '@tarojs/components'
// import { Login } from '@/components'
import { AtInput, AtForm } from 'taro-ui'
import './index.scss'

export default () => {
  const [name, setName] = useState('')
  const colleges = [
    '信息与通信工程学院',
    '电子科学与工程学院',
    '材料与能源学院',
    '机械与电气工程学院',
    '光电科学与工程学院',
    '自动化工程学院',
    '资源与环境学院',
    '计算机科学与工程学院',
    '信息与软件工程学院',
    '航空航天学院',
    '数学科学学院',
    '物理学院',
    '医学院',
    '生命科学与技术学院',
    '经济与管理学院',
    '公共管理学院',
    '外国语学院',
    '马克思主义学院',
    '格拉斯哥学院',
    '基础与前沿研究院',
    '通信抗干扰技术国家级重点实验室',
    '电子科学技术研究院',
    '英才实验学院',
    '示范性微电子学院'
  ]
  const [college, setCollege] = useState(colleges[0])
  const [studentNumber, setStudentNumber] = useState<number>()
  return (
    <AtForm>
      <AtInput
        name="name"
        title="姓名"
        type="text"
        placeholder="请输入真实姓名"
        value={name}
        onChange={value => setName(value)}
      />
      <Picker
        mode="selector"
        range={colleges}
        onChange={e => setCollege(colleges[e.detail.value])}
        value={0}
      >
        <View className="picker-wrapper">
          <Label className="title">学院</Label>
          <View className="text">{college}</View>
        </View>
      </Picker>
      <AtInput
        name="studentNumber"
        title="学号"
        type="number"
        placeholder="学号"
        value={studentNumber}
        onChange={value => setStudentNumber(value)}
      />
    </AtForm>
  )
}
