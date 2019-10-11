// "sitemapLocation": "sitemap.json" 775Bc2A8-493A-cAbd-B459-bf3Ad87DeAAd
const app = getApp();
Page({
  data: {
    courseList:[],  // 课程id列表
    bannerList:[],  // banner图列表
    searchStr:'', // 搜索内容
  },
  onLoad: function (options) {
    // 获取学生所学课程列表
    this.getcourseList();
    // 获取banner图
    this.getbannerImg();
  },
  // 获取学生所学课程列表
  getcourseList(){
    let data = {
      courseName: this.data.searchStr,
      userId: app.globalData.userInfo.id
    }
    app.wxAjax('/learning/userCourseInfoList', data).then(res=>{
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
  // 获取课程详情
  videoDetail(type){
    // 获取视频 
    let videoList = [];
    for (let i = 0; i < this.data.courseList.length; i++) {
      let data = {
        userId: app.globalData.userInfo.id,
        courseId: this.data.courseList[i].id,
        resourceType: type,
        status:0,
        start:1,
        limit:10
      }
      videoList.push(app.wxAjax('/course/getUserCourseLearningLog', data))
    }
    Promise.all(videoList).then(res=>{
      console.log(res)
    })
  },
  //课程列表点击
  listFN(e){
    if (e.detail.type === 1){
      wx.navigateTo({
        url: '../../courseList/courseList?courseId=' + e.detail.id,
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
