// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

const now = new Date()

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
  return `${monday.getMonth() + 1}/${monday.getDate()}-${sunday.getMonth() + 1}/${sunday.getDate()}`
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

/**
 * 是否距离此人本周的上一次签到4小时以外
 * @param {number} studentNumber
 */
async function isBeforeLastCheckIn4Hours(studentNumber) {
  const result = await db
    .collection('checkIn')
    .where({
      studentNumber,
      week: calculateWeek()
    })
    .orderBy('checkInTime', 'desc')
    .limit(1)
    .get()
  if (result.data.length === 0) {
    return true
  } else {
    return now.getTime() - result.data[0]['checkInTime'].getTime() > 1000 * 60 * 60 * 4
      ? true
      : false
  }
}

// 云函数入口函数
exports.main = async (event, context) => {
  const isBeforeCheckIn4Hours = await isBeforeLastCheckIn4Hours(event.studentNumber)
  if (isBeforeCheckIn4Hours) {
    return await db.collection('checkIn').add({
      data: {
        studentNumber: event.studentNumber,
        checkInTime: now,
        week: calculateWeek()
      }
    })
  } else {
    throw new Error('签到失败,距离上一次签到时间过短')
  }
}
