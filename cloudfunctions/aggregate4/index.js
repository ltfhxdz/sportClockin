// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init({
  env: 'dev-8gw7ruk57390fef9'
});
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;

//根据small_name，进行分组，得到第一个big_name
exports.main = async (event, context) => {
  try {
    return await db.collection('clockin').aggregate()
      .group({
        _id: '$small_name',
        big_name: $.first('$big_name')
      })
      .end();
  } catch (e) {
    console.error(e);
  }
}