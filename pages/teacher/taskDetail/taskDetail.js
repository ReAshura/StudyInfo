const app = getApp();
Page({
  data: {
    courseId: '',// 课程id
  },
  onLoad: function (e) {
    if (e.courseId) {
      this.getcourseDetail(e.courseId)
    }
  },
  // 获取课程详情
  getcourseDetail(courseId) {
    let data = {
      userId: app.globalData.userInfo.id,
      resourceType: 0,
      status: 0,
      start: 1,
      limit: -1,
      courseId,
    }
    app.wxAjax('/course/getUserCourseLearningLog', data).then(res => {
      console.log(res)
    })
  }
})