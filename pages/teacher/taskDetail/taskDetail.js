const app = getApp();
Page({
  data: {
    courseId: '',// 课程id
  },
  onLoad: function (e) {
    if (e.courseId) {
      this.setData({
        courseId: e.courseId
      })
      this.getcourseDetail(e.courseId)
    }
  },
  // 获取课程详情
  getcourseDetail(courseId) {
    let data = {
      id:courseId
    }
    app.wxAjax('/course/getCourseInfo', data).then(res => {
      console.log(res)
    })
  }
})