// pages/student/course/course.js
Page({
  data: {

  },
  onLoad: function (options) {

  },
  //课程列表点击
  listFN(e) {
    if (e.detail.type === 1) {
      wx.navigateTo({
        url: '../../courseList/courseList?courseId=' + e.detail.id,
      })
    }
  }
})