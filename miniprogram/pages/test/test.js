// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statisticsList: [{
        "muscle": "胸肌",
        "days": 66,
        "actionList": [{
            "action": "史密斯上斜卧推",
            "groupList": [{
                "weight": "35公斤",
                "start": "2021-5-14",
                "days": 19
              },
              {
                "weight": "30公斤",
                "start": "2021-11-9",
                "days": 10
              },
              {
                "weight": "40公斤",
                "start": "2022-2-16",
                "days": 11
              }
            ]
          },
          {
            "action": "平板杠铃卧推",
            "groupList": [{
                "weight": "30公斤",
                "start": "2021-5-12",
                "days": 47
              },
              {
                "weight": "11公斤",
                "start": "2022-1-13",
                "days": 1
              },
              {
                "weight": "20公斤",
                "start": "2021-11-16",
                "days": 17
              }
            ]
          },
          {
            "action": "龙门架夹胸",
            "groupList": [{
              "weight": "40磅",
              "start": "2021-5-14",
              "days": 5
            }]
          },
          {
            "action": "蝴蝶机夹胸",
            "groupList": [{
                "weight": "39公斤",
                "start": "2022-1-6",
                "days": 3
              },
              {
                "weight": "34公斤",
                "start": "2021-8-27",
                "days": 17
              },
              {
                "weight": "16公斤",
                "start": "2021-6-21",
                "days": 1
              },
              {
                "weight": "24公斤",
                "start": "2021-6-23",
                "days": 6
              },
              {
                "weight": "29公斤",
                "start": "2021-8-9",
                "days": 7
              }
            ]
          }
        ]
      },
      {
        "muscle": "背肌",
        "days": 57,
        "actionList": [{
            "action": "坐姿划船",
            "groupList": [{
                "weight": "50公斤",
                "start": "2021-5-13",
                "days": 23
              },
              {
                "weight": "60公斤",
                "start": "2021-7-19",
                "days": 4
              },
              {
                "weight": "40公斤",
                "start": "2021-10-19",
                "days": 19
              },
              {
                "weight": "30公斤",
                "start": "2021-10-15",
                "days": 2
              }
            ]
          },
          {
            "action": "蝴蝶机反夹",
            "groupList": [{
                "weight": "20公斤",
                "start": "2021-5-31",
                "days": 18
              },
              {
                "weight": "16公斤",
                "start": "2021-5-17",
                "days": 14
              }
            ]
          },
          {
            "action": "高位下拉",
            "groupList": [{
                "weight": "34公斤",
                "start": "2021-5-13",
                "days": 32
              },
              {
                "weight": "29公斤",
                "start": "2021-8-15",
                "days": 17
              },
              {
                "weight": "24公斤",
                "start": "2021-10-19",
                "days": 1
              },
              {
                "weight": "39公斤",
                "start": "2021-11-18",
                "days": 7
              }
            ]
          }
        ]
      },
      {
        "muscle": "腹肌",
        "days": 13,
        "actionList": [{
          "action": "仰卧起坐",
          "groupList": [{
            "weight": "0公斤",
            "start": "2021-5-13",
            "days": 13
          }]
        }]
      },
      {
        "muscle": "腿肌",
        "days": 3,
        "actionList": [{
          "action": "内侧肌",
          "groupList": [{
            "weight": "50公斤",
            "start": "2021-9-10",
            "days": 3
          }]
        }]
      },
      {
        "muscle": "手臂",
        "days": 9,
        "actionList": [{
          "action": "手臂弯举",
          "groupList": [{
              "weight": "5公斤",
              "start": "2021-12-16",
              "days": 8
            },
            {
              "weight": "7公斤",
              "start": "2021-12-14",
              "days": 2
            }
          ]
        }]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let statisticsList = this.data.statisticsList;
    
    for (let a in statisticsList) {
      let actionList = statisticsList[a].actionList;
      for (let b in actionList) {
        console.log(actionList[b].action);
        let groupList = actionList[b].groupList;

        for (let i = 0; i < groupList.length - 1; i++) {
          for (let j = 0; j < groupList.length - 1 - i; j++) {
            let weightA = groupList[j].weight;
            if (weightA.indexOf('公斤') != -1) {
              weightA = weightA.substr(0, weightA.indexOf('公斤'));
            } else {
              if (weightA.indexOf('磅') != -1) {
                weightA = weightA.substr(0, weightA.indexOf('磅'));
              }
            }

            let weightB = groupList[j + 1].weight;
            if (weightB.indexOf('公斤') != -1) {
              weightB = weightB.substr(0, weightB.indexOf('公斤'));
            } else {
              if (weightB.indexOf('磅') != -1) {
                weightB = weightB.substr(0, weightB.indexOf('磅'));
              }
            }

            if (parseInt(weightA) > parseInt(weightB)) {
              var temp = groupList[j];
              groupList[j] = groupList[j + 1];
              groupList[j + 1] = temp;
            }
          }
        }
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})