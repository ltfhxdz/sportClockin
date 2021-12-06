// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init({
  env: 'dev-8gw7ruk57390fef9'
});
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;

exports.main = async (event, context) => {
  try {
    return await db.collection('clockin').aggregate().lookup({
        from: "detail", //把detail表关联上
        localField: 'small_id', //打卡表的关联字段
        foreignField: 'small_id', //明细表的关联字段
        as: 'clockinList' //匹配的结果作为clockinList相当于起个别名
      })
      .limit(1)
      .end({
        success: function (res) {
          return res;
        },
        fail(error) {
          return error;
        }
      });

  } catch (e) {
    console.error(e);
  }
}