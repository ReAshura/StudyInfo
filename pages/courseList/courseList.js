const app = getApp();
Page({
  data: {
    courseId:'',// 课程id
    dataList:[],// 文章列表
  },
  onLoad: function (e) {
    if (e.courseId){
      this.setData({
        courseId: e.courseId
      })
      this.getcourseDetail()
    }
  },
  // 获取课程详情
  getcourseDetail(){
    let data = {
      userId: app.globalData.userInfo.id,
      resourceType:0,
      status:0,
      start:1,
      limit:-1,
      courseId: this.data.courseId,
    }
    app.wxAjax('/learning/getUserCourseLearningLog', data).then(res=>{
      this.setData({
        dataList: res.dataList
      })
      console.log(this.data.dataList)
    })
  }
})