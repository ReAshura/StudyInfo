// pages/student/course/course.js
const app = getApp();
Page({
  data: {
    searchStr:'', // 搜索内容
    courseList:[], // 数据
    ajaxEnd: false, // 请求是否完成 ， 只为了UI切换
  },
  onShow: function (options) {
    // 获取学生所学课程列表
    this.getcourseList();
  },
  //课程列表点击 
  listFN(e) {
    console.log(e)
    if (e.detail.type === 1) {
      wx.navigateTo({
        url: '../../courseList/courseList?courseId=' + e.detail.id,
      })
    }
  },
  // 获取学生所学课程列表
  getcourseList() {
    let data = {
      courseName: this.data.searchStr,
      userId: app.globalData.userInfo.id,
      status:0
    }
    app.wxAjax('/learning/userCourseInfoList', data).then(res => {
      this.setData({
        courseList: res.dataList,
        ajaxEnd:true
      })
    })
  },
  // 监听到点击搜索按钮
  searchFN(e) {
    this.setData({
      searchStr: e.detail.text
    })
    // 获取学生所学课程列表
    this.getcourseList();
  },
})