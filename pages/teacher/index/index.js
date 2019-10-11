const app = getApp();
Page({
  data: {
    courseList:[],
    userInfo: {}, // 学生信息
    imgSrc: app.globalData.realmName + '/xuegong/uploads/userphoto/', // 
  },
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    
    // 获取课程列表
    this.getCourseList();
  },
  // 获取课程列表
  getCourseList(){
    app.wxAjax('/course/courseInfoList', { code: '', name: '', teacherId: app.globalData.userInfo.id, start: 1, limit:-1}).then(res=>{
      console.log(res)
      this.setData({
        courseList: res.dataList
      })
    })
  },
  // 监听课程列表点击
  monitorFN(e){
    let type = e.detail.type;// 0 查看全部 1查看列表
    if (type === 1){
      wx.navigateTo({
        //  + e.detail.id
        url: '../taskDetail/taskDetail?courseId=4028cedd6d336fc4016d338a15570002',
      })
    }else{
      wx.navigateTo({
        url: '../taskView/taskView'
      })
    }
  },
  //监听学生任务
  studentEvent(e){
    let type = e.detail.type;// 0 查看全部 1查看列表
    if (type === 1){
      wx.navigateTo({
        url: '../seeInfo/seeInfo',
      })
    }
  },
})