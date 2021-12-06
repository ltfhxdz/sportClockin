// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init({
  env: 'dev-8gw7ruk57390fef9'
});
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;

//返回所有数据
exports.main = async (event, context) => {
  try {
    return await db.collection('clockin')
      .get({
        success: function (res) {
          return res
        }
      });

  } catch (e) {
    console.error(e);
  }
}