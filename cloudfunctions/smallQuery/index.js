// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init({
  env: 'dev-8gw7ruk57390fef9'
});
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;

exports.main = async (event, context) => {

  let openid = event.openid;
  let smallList = await smallQuery(openid);

  return smallList;
}

async function smallQuery(openid) {
  try {
    let queryList = await db.collection('small').field({
        _id: true,
        big_id: true,
        name: true,
      }).where({
        _openid: openid,
        activation: true
      })
      .limit(35600)
      .get();

    return queryList;
  } catch (e) {
    console.error(e);
  }
}