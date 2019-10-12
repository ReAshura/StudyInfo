const app = getApp();
Page({
  data: {
    courseId: '',// 课程id
  },
  onLoad: function (e) {
    // e.courseId = '4028cedd6d336fc4016d338a15570002'
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
      courseId:courseId,
      resourceType:0
    }
    app.wxAjax('/course/resourceList', data).then(res => {
      this.setData({
        dataList: res.dataList
      })
    })
  }
})