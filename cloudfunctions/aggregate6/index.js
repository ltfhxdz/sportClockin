// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init({
  env: 'dev-8gw7ruk57390fef9'
});
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;

//根据small_weight，进行分组，计算总数
exports.main = async (event, context) => {
  try {
    let resultList = await db.collection('clockin').aggregate().sort({
        big_name: 1,
        small_name: 1
      })
      .group({
        _id: '$small_weight',
        startDate: $.min('$clockin_date')
      })
      .end();

    return resultList;

  } catch (e) {
    console.error(e);
  }
}