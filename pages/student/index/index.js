// "sitemapLocation": "sitemap.json" 775Bc2A8-493A-cAbd-B459-bf3Ad87DeAAd
const app = getApp();
Page({
  data: {
    courseList:[],  // 课程id列表
    bannerList:[],  // banner图列表
    searchStr:'', // 搜索内容
  },
  onLoad: function (options) {
    // 获取banner图
    this.getbannerImg();
  },
  onShow(){
    // 获取学生所学课程列表
    this.getcourseList();
  },
  // 获取学生所学课程列表
  getcourseList(){
    let data = {
      courseName: this.data.searchStr,
      userId: app.globalData.userInfo.id,
      status:0,
      start:0,
      limit:3
    }
    app.wxAjax('/learning/userCourseInfoList', data).then(res=>{
      res.dataList.forEach(item => {
        let num = parseInt(wx.getStorageSync(item.courseId))
        item.oldNum = isNaN(num) ? 0 : num
      })
      this.setData({
        courseList: res.dataList
      })
    })
  },
  // 监听到点击搜索按钮
  searchFN(e) {
    this.setData({
      searchStr: e.detail.text
    })
    // 获取学生所学课程列表
    this.getcourseList();
  },
  // // 获取课程详情
  // videoDetail(type){
  //   // 获取视频 
  //   let videoList = [];
  //   for (let i = 0; i < this.data.courseList.length; i++) {
  //     let data = {
  //       userId: app.globalData.userInfo.id,
  //       courseId: this.data.courseList[i].id,
  //       resourceType: type,
  //       status:0,
  //       start:0,
  //       limit:3
  //     }
  //     videoList.push(app.wxAjax('/course/getUserCourseLearningLog', data))
  //   }
  //   Promise.all(videoList).then(res=>{
  //     console.log(res)
  //   })
  // },
  //课程列表点击
  listFN(e){
    if (e.detail.type === 1){
      wx.navigateTo({
        url: '../../courseList/courseList?courseId=' + e.detail.id + '&num=' + this.data.courseList[e.detail.index].resourceCount,
      })
    }else {
      wx.switchTab({
        url: '../course/course',
      })
    }
  },
  // 获取banner图
  getbannerImg(){
    app.wxAjax('/common/crouselImageList', { start:1,limit:-1}).then(res=>{
      this.setData({
        bannerList: res.dataList
      })
    })
  }
})
