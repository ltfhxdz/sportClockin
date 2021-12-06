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
    return await getIdList(event);
}

async function getIdList(event) {
  try {
    let queryList = await db.collection('detail').aggregate()
      .match({
        small_id: _.in(event.inArray)
      })
      .sort({
        exercise_date: -1
      })
      .group({
        _id: '$small_id',
        row: $.first('$$ROOT')
      })
      .end();

    return queryList;

  } catch (e) {
    console.error(e);
  }
}