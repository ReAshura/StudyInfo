const app = getApp();
Page({
  data: {
    courseId:'',// 课程id
    dataList:[],// 文章列表
    searchText:'', // 搜索内容
    ajaxEnd:false, // 请求是否完成 ， 只为了UI切换
    start: 0,
    limit: 10,
    dataLength:0,
  },
  onLoad: function (e) {
    console.log(e)
    if (e.courseId){
      this.setData({
        courseId: e.courseId
      })
      this.getcourseDetail();
      if (!isNaN(parseInt(e.num))){
        wx.setStorage({
          key: e.courseId,
          data: e.num
        })
      }
    }
  },
  //上拉更新
  onReachBottom() {
    if (this.data.limit === this.data.dataLength) {
      this.setData({
        start: this.data.start + this.data.limit
      })
      this.getcourseDetail();
    }
  },
  // 获取课程详情
  getcourseDetail(){
    this.setData({ ajaxEnd: false})
    let data = {
      resourceName: this.data.searchText,
      userId: app.globalData.userInfo.id,
      resourceType:0,
      status:0,
      start:this.data.start,
      limit:this.data.limit,
      courseId: this.data.courseId,
    }
    app.wxAjax('/learning/getUserCourseLearningLog', data).then(res=>{
      this.setData({
        dataList: this.data.dataList.concat(res.dataList),
        dataLength: res.dataList.length,
        ajaxEnd:true
      })
      // console.log(this.data.dataList)
    })
  },
  searchFN(e) {
    this.setData({
      searchText: e.detail.text,
      start: 0, // 分页
      dataList: []
    })
    // 获取课程列表
    this.getcourseDetail();
  },
})