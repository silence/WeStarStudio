import Taro, { useState } from '@tarojs/taro'
import { Picker, View, Label } from '@tarojs/components'
import { getOpenId, updateUserInfoC } from '@/utils'
import { AtInput, AtForm, AtButton, AtModal } from 'taro-ui'
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
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setModal] = useState<Array<any>>([false])
  const handleClick = async () => {
    if (name === '' && studentNumber === undefined) return
    setLoading(true)
    const { userInfo } = await Taro.getUserInfo()
    const { result } = await getOpenId()
    try {
      await updateUserInfoC({ name, college, studentNumber, ...userInfo, ...result })
    } catch (err) {
      console.log(err)
      setModal([true, '绑定失败'])
      setLoading(false)
      return
    }
    setLoading(false)
    setModal([true, '恭喜绑定成功🎉🎉🎉'])
  }
  return (
    <AtForm>
      <AtInput
        name="name"
        title="姓名"
        type="text"
        placeholder="请输入真实姓名"
        error={name === '' ? true : false}
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
        error={studentNumber === undefined ? true : false}
        value={studentNumber}
        onChange={value => setStudentNumber(value)}
      />
      <AtButton
        type="primary"
        className="confirm-btn"
        loading={loading}
        onClick={() => handleClick()}
      >
        确认绑定
      </AtButton>
      <AtModal
        isOpened={isModalOpen[0]}
        title="标题"
        cancelText="取消"
        confirmText="确认"
        onClose={() => console.log('close')}
        onCancel={() => setModal([false])}
        onConfirm={() =>
          isModalOpen[1] === '绑定失败' ? setModal([false]) : Taro.navigateBack({ delta: 2 })
        }
        content={isModalOpen[1]}
      />
    </AtForm>
  )
}
