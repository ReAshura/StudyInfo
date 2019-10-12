// pages/teacher/taskView/taskView.js
const app = getApp();
Page({
  data: {
    courseList:[], // 课程列表
  },
  onLoad: function (options) {
    // 获取课程列表
    this.getCourseList();
  },
  // 获取课程列表
  getCourseList() {
    app.wxAjax('/course/courseInfoList', { code: '', name: '', teacherId: app.globalData.userInfo.id, start: 1, limit: -1 }).then(res => {
      console.log(res)
      this.setData({
        courseList: res.dataList
      })
    })
  },
  // 监听课程列表点击
  monitorFN(e) {
    let type = e.detail.type;// 0 查看全部 1查看列表
    if (type === 1) {
      wx.navigateTo({
        url: '../taskDetail/taskDetail?courseId=' + e.detail.id,
      })
    }
  },
  // 监听到点击搜索按钮
  searchFN(e){
    console.log(e.detail.text)
  }
})
