// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'dev-8gw7ruk57390fef9'
});

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();

  return {
    openid: wxContext.OPENID
  }

}