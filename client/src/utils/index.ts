import Taro from '@tarojs/taro'

export function throttle(func: Function, delay: number) {
  var last = 0
  return function(...args: any[]) {
    var curr = +new Date()
    if (curr - last > delay) {
      func.apply(this, args)
      last = curr
    }
  }
}

export async function getOpenId() {
  return await Taro.cloud.callFunction({
    name: 'getOpenId',
    data: {}
  })
}
interface IUserInfo {
  openid: string
  name: string
  college: string
  studentNumber: number
  avatarUrl?: string
  city?: string
  gender?: number
  nickName?: string
  province?: string
}

export async function updateUserInfoC(userInfo: IUserInfo) {
  const db = Taro.cloud.database()
  const userInfoC = db.collection('userInfoC')
  return await userInfoC.add({
    data: {
      _id: userInfo.studentNumber,
      ...userInfo
    }
  })
}

export function getConnectedWifi() {
  return Taro.startWifi().then(res => {
    console.log(res)
    return Taro.getConnectedWifi()
  })
}

export async function checkIn(studentNumber: number) {
  return await Taro.cloud.callFunction({
    name: 'checkIn',
    data: { studentNumber }
  })
}

export async function checkInRecord(studentNumber: number) {
  return await Taro.cloud.callFunction({
    name: 'checkInRecord',
    data: { studentNumber }
  })
}
