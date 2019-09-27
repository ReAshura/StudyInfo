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
      resourceType:2,
      resourceId:courseId,
    }
    app.wxAjax('/course/getResourceStat', data).then(res => {
      console.log(res)
    })
  }
})