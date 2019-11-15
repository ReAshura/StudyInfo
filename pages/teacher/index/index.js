const app = getApp();
Page({
  data: {
    courseList:[],
    userInfo: {}, // 学生信息
    imgSrc: app.globalData.realmName + '/xuegong/uploads/userphoto/', // 
    latelyStudent:[], // 近期完成的学生
  },
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    // 获取课程列表
    this.getCourseList();
    // 获取最近完成的学生
    this.getLatelyStudent();
  },
  // 获取课程列表
  getCourseList(){
    app.wxAjax('/course/courseInfoList', { code: '', name: '', teacherId: app.globalData.userInfo.id, start: 1, limit:3}).then(res=>{
      this.setData({
        courseList: res.dataList
      })
    })
  },
  // 获取最近完成的学生
  getLatelyStudent(){
    let data = {
      teacherId: app.globalData.userInfo.id,
      start:1,
      limit:3
    }
    app.wxAjax('/learning/studentPointList',data).then(res=>{
      this.setData({
        latelyStudent:res.dataList
      })
    })
  },
  // 监听课程列表点击
  monitorFN(e){
    let type = e.detail.type;// 0 查看全部 1查看列表
    if (type === 1){
      wx.navigateTo({
        url: '../taskDetail/taskDetail?courseId=' + e.detail.id,
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
        url: '../seeInfo/seeInfo?id=' + e.detail.id,
      })
    }
  },
})