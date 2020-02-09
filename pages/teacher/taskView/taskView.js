// pages/teacher/taskView/taskView.js
const app = getApp();
Page({
  data: {
    courseList:[], // 课程列表
    searchText:'', // 搜索内容
    limit: 10, // 页面容量
    isLimit: 0, // 当前获取了多少数据
    page: 0, // 分页
    ajaxEnd: false, // 请求是否完成 ， 只为了UI切换
    courseType: 1, // 课程类型 1学生部 2保卫处
  },
  onLoad: function (options) {
    // 获取课程列表
    this.getCourseList();
  },
  //上拉更新
  onReachBottom() {
    if (this.data.isLimit === this.data.limit) {
      this.setData({
        page: (this.data.page + this.data.limit)
      })
      this.getCourseList();
    }
  },
  // 获取课程列表
  getCourseList() {
    let data = { 
      code: '', 
      name: this.data.searchText, 
      teacherId: app.globalData.userInfo.id, 
      start: this.data.page, 
      courseType: this.data.courseType,
      isPublished: true,
      limit: this.data.limit 
    }
    
    app.wxAjax('/course/courseInfoList', data).then(res => {
      console.log(res)
      this.setData({
        courseList: this.data.courseList.concat(res.dataList),
        isLimit: res.dataList.length,
        ajaxEnd:true
      })
    })
  },
  // 监听课程列表点击
  monitorFN(e) {
    let type = e.detail.type;// 0 查看全部 1查看列表
    if (type === 1) {
      wx.navigateTo({
        url: '../taskDetail/taskDetail?courseId=' + e.detail.id,
      })
    }
  },
  // 切换课程类别，1学生处 2保卫处
  selectTypeFN(e) {
    if (e.target.dataset.id) {
      this.setData({
        courseType: e.target.dataset.id,
        ajaxEnd:false,
        page: 0, // 分页
        courseList: []
      })
      // 获取课程列表
      this.getCourseList();
    }
  },
  // 监听到点击搜索按钮
  searchFN(e) {
    this.setData({
      searchText: e.detail.text,
      page: 0, // 分页
      ajaxEnd:false,
      courseList:[]
    })
    // 获取课程列表
    this.getCourseList();
  },
})
