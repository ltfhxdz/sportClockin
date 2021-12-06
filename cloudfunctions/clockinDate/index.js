// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init({
  env: 'dev-8gw7ruk57390fef9'
});
const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
  try {
    let year = event.year;
    let month = event.month;
    let month1 = year + "-" + month + "-1" + " 00:00:00";
    let month2 = "";
    if (month == 12) {
      month2 = (year + 1)+ "-" + "1" + "-1" + " 00:00:00";
    } else {
      month2 = year + "-" + (month + 1) + "-1" + " 00:00:00";
    }


    let sdate = new Date(month1);
    let edate = new Date(month2);

    return await db.collection('clockin').where({
      _openid: event.openid,
      clockin_date: _.and(_.gte(sdate), _.lt(edate))
    }).get({
      success: function (res) {
        return res
      }
    });
  } catch (e) {
    console.error(e);
  }
}