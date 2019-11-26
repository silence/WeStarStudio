// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const now = new Date()

  async function allUserInfoArray() {
    const MAX_LIMIT = 100
    // 取出集合总数
    const countResult = await db.collection('userInfoC').count()
    const total = countResult.total
    // 分几次取(从0开始)
    const batchTimes = Math.ceil(total / 100)
    // 所有读操作的promise数组
    const tasks = []
    for (let i = 0; i < batchTimes; i++) {
      const promise = db
        .collection('userInfoC')
        .skip(i * MAX_LIMIT)
        .limit(MAX_LIMIT)
        .get()
      tasks.push(promise)
    }
    // 等待所有
    return (await Promise.all(tasks)).reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data)
      }
    })['data']
  }

  function calculateWeek() {
    let monday, sunday
    console.log(now)
    const today = now.getDay()
    if (today === 0) {
      monday = subDays(6)
      sunday = now
    } else {
      monday = subDays(today - 1)
      sunday = addDays(7 - today)
    }
    return `${monday.getFullYear()}/${monday.getMonth() +
      1}/${monday.getDate()}-${monday.getFullYear()}/${sunday.getMonth() + 1}/${sunday.getDate()}`
  }

  /**
   * https://github.com/you-dont-need/You-Dont-Need-Momentjs#add
   * moment().add()
   */
  function addDays(num) {
    const time = new Date()
    time.setDate(time.getDate() + num)
    return time
  }

  /**
   * https://github.com/you-dont-need/You-Dont-Need-Momentjs#subtract
   * moment().subtract()
   */
  function subDays(num) {
    return new Date(now.getTime() - 1000 * 60 * 60 * 24 * num)
  }

  // 具体操作

  const studentNumber = event.studentNumber
  // 本周的所有数据
  const allUserInfo = await allUserInfoArray()
  const map = new Map()
  allUserInfo.map(val => {
    map.set(val.studentNumber, val)
  })
  const { data } = await db
    .collection('checkIn')
    .where({
      week: calculateWeek()
    })
    .orderBy('checkInTime', 'desc')
    .get()

  return data.map(curr => {
    const obj = {}
    const studentNumber = curr.studentNumber
    const { avatarUrl, name, nickName } = map.get(studentNumber)
    obj['checkInTime'] = curr.checkInTime
    obj['avatarUrl'] = avatarUrl
    obj['name'] = name
    obj['nickName'] = nickName
    return obj
  })
}
