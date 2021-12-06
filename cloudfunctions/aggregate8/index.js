// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init({
  env: 'dev-8gw7ruk57390fef9'
});
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;

//根据client_date，进行分组，计算总数
exports.main = async (event, context) => {
  try {
    let queryList = await db.collection('clockin').aggregate()
      .match({
        _openid: event.openid
      })
      .group({
        _id: '$client_date',
        num: $.sum(1)
      })
      .end();

    return queryList.list.length;

  } catch (e) {
    console.error(e);
  }
}