// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init({
  env: 'dev-8gw7ruk57390fef9'
});
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;

//根据big_name，进行分组，得到所有的日期
exports.main = async (event, context) => {

  let openid = event.openid;

  let muscleList = await getMuscleList(openid);
  let nameList = await getNameList(openid);
  let startList = await getStartList(openid);
  let smallDaysList = await getSmallDaysList(openid);


  let statisticsList = [];
  for (let x in muscleList) {
    let actionList = [];
    for (let y in nameList) {
      if (muscleList[x]['muscle'] == nameList[y]['big_name']) {
        let groupList = [];
        for (let z in startList) {
          let actionArray = startList[z]['_id'].split(' ');
          if (nameList[y]['_id'] == actionArray[0]) {
            let smallDays = '';
            for (let a in smallDaysList) {
              if (smallDaysList[a]['_id'] == startList[z]['_id']) {
                smallDays = smallDaysList[a]['days'];
                break;
              }
            }

            let startDate = new Date(startList[z]['startDate']);
            let year = startDate.getFullYear();
            let month = startDate.getMonth();
            let day = startDate.getDate();
            let startDate_str = year + "-" + (month + 1) + "-" + day;

            let groupMap = {};
            groupMap['weight'] = actionArray[1];
            groupMap['start'] = startDate_str;
            groupMap['days'] = smallDays;
            groupList.push(groupMap);
          }
        }
        let actionMap = {};
        actionMap['action'] = nameList[y]['_id'];
        actionMap['groupList'] = groupList;
        actionList.push(actionMap);
      }
    }

    let statisticsMap = {};
    statisticsMap['muscle'] = muscleList[x]['muscle'];
    statisticsMap['days'] = muscleList[x]['days'];
    statisticsMap['actionList'] = actionList;
    statisticsList.push(statisticsMap);
  }

  return statisticsList;
}


async function getSmallDaysList(openid) {
  try {
    let queryList = await db.collection('clockin').aggregate()
      .match({
        _openid: openid
      })
      .group({
        _id: '$small_weight',
        days: $.sum(1)
      })
      .end();

    return queryList['list'];

  } catch (e) {
    console.error(e);
  }
}

async function getStartList(openid) {
  try {
    let queryList = await db.collection('clockin').aggregate()
      .match({
        _openid: openid
      })
      .sort({
        big_name: 1,
        small_name: 1
      })
      .group({
        _id: '$small_weight',
        startDate: $.min('$clockin_date')
      })
      .end();

    return queryList['list'];

  } catch (e) {
    console.error(e);
  }
}


async function getNameList(openid) {
  try {
    let queryList = await db.collection('clockin').aggregate()
      .match({
        _openid: openid
      })
      .group({
        _id: '$small_name',
        big_name: $.first('$big_name')
      })
      .end();

    return queryList['list'];
  } catch (e) {
    console.error(e);
  }
}

async function getMuscleList(openid) {
  try {
    let queryList = await db.collection('clockin').aggregate()
      .match({
        _openid: openid
      })
      .sort({
        big_name: 1,
        clockin_date: 1
      })
      .group({
        _id: '$big_name',
        dates: $.push({
          clockin_date: '$clockin_date'
        })
      })
      .end();

    let muscleList = [];
    let list = queryList.list;
    for (let x in list) {
      let resultMap = {};
      resultMap['muscle'] = list[x]['_id'];

      let dateList = [];
      let dates = list[x]['dates'];
      for (let y in dates) {
        let flag = false;
        let dateTemp = new Date(dates[y]['clockin_date']);
        let year = dateTemp.getFullYear();
        let month = dateTemp.getMonth();
        let day = dateTemp.getDate();
        let date_str = year + "-" + (month + 1) + "-" + day;
        for (let z in dateList) {
          if (dateList[z] == date_str) {
            flag = true;
            break;
          }
        }
        if (!flag) {
          dateList.push(date_str);
        }
      }


      resultMap['days'] = dateList.length;
      muscleList.push(resultMap);
    }

    return muscleList;

  } catch (e) {
    console.error(e);
  }
}