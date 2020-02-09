// pages/student/course/course.js
const app = getApp();
Page({
  data: {
    searchStr:'', // 搜索内容
    courseList:[], // 数据
    ajaxEnd: false, // 请求是否完成 ， 只为了UI切换
    start:0,
    limit: 8,
    courseLength:0
  },
  onShow: function (options) {
    this.setData({
      courseList:[],
      start:0
    })
    // 获取学生所学课程列表
    this.getcourseList();
  },
  //上拉更新
  onReachBottom() {
    if (this.data.limit === this.data.courseLength) {
      this.setData({
        start: this.data.start + this.data.limit
      })
      this.getcourseList();
    }
  },
  //课程列表点击 
  listFN(e) {
    console.log()
    if (e.detail.type === 1) {
      wx.navigateTo({
        url: '../../courseList/courseList?courseId=' + e.detail.id + '&num=' + this.data.courseList[e.detail.index].resourceCount,
      })
    }
  },
  // 获取学生所学课程列表
  getcourseList() {
    this.setData({ ajaxEnd:false})
    let data = {
      courseName: this.data.searchStr,
      userId: app.globalData.userInfo.id,
      status:0,
      start: this.data.start,
      limit: this.data.limit
    }
    app.wxAjax('/learning/userCourseInfoList', data).then(res => {
      res.dataList.forEach(item=>{
        let num = parseInt(wx.getStorageSync(item.courseId))
        item.oldNum = isNaN(num) ? 0 : num
      })
      this.setData({
        courseList: this.data.courseList.concat(res.dataList),
        courseLength: res.dataList.length,
        ajaxEnd:true
      })
    })
  },
  // 监听到点击搜索按钮
  searchFN(e) {
    this.setData({
      searchStr: e.detail.text,
      courseList: [],
      start: 0
    })
    // 获取学生所学课程列表
    this.getcourseList();
  },
})