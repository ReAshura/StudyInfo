const app = getApp();
Page({
  data: {
    courseId:'',// 课程id
    dataList:[],// 文章列表
    searchText:'', // 搜索内容
    ajaxEnd:false, // 请求是否完成 ， 只为了UI切换
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
      resourceName: this.data.searchText,
      userId: app.globalData.userInfo.id,
      resourceType:0,
      status:0,
      start:1,
      limit:-1,
      courseId: this.data.courseId,
    }
    app.wxAjax('/learning/getUserCourseLearningLog', data).then(res=>{
      this.setData({
        dataList: res.dataList,
        ajaxEnd:true
      })
      // console.log(this.data.dataList)
    })
  },
  searchFN(e) {
    this.setData({
      searchText: e.detail.text,
      // page: 0, // 分页
      // courseList: []
    })
    // 获取课程列表
    this.getcourseDetail();
  },
})