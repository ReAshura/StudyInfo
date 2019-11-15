const app = getApp();
Page({
  data: {
    courseId: '',// 课程id
    searchText:'', // 搜索内容
    ajaxEnd: false, // 请求是否完成 ， 只为了UI切换
    dataList:[], // 数据
  },
  onLoad: function (e) {
    // e.courseId = '4028cedd6d336fc4016d338a15570002'
    if (e.courseId) {
      this.setData({
        courseId: e.courseId
      })
      this.getcourseDetail()
    }
  },
  // 获取课程详情
  getcourseDetail() {
    let data = {
      name:this.data.searchText,
      courseId:this.data.courseId,
      resourceType:0
    }
    app.wxAjax('/course/resourceList', data).then(res => {
      this.setData({
        dataList: res.dataList,
        ajaxEnd:true
      })
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