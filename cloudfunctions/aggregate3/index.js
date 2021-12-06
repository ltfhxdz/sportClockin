// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init({
  env: 'dev-8gw7ruk57390fef9'
});
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;

//根据name，进行分组，得到最小的日期
exports.main = async (event, context) => {
  try {
    return await db.collection('detail').aggregate()
      .group({
        _id: '$name',
        minDate: $.min('$exercise_date')
      })
      .end();

  } catch (e) {
    console.error(e);
  }
}