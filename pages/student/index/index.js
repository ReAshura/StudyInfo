// "sitemapLocation": "sitemap.json" 775Bc2A8-493A-cAbd-B459-bf3Ad87DeAAd
const app = getApp();
Page({
  data: {
    courseList:[],  // 课程id列表

  },
  onLoad: function (options) {
    // 获取学生所学课程列表
    this.getcourseList();
    
  },
  // 获取学生所学课程列表
  getcourseList(){
    let data = {
      userName: app.globalData.userName,
      password: app.globalData.password
    }
    app.wxAjax('/course/userCourseInfoList', data).then(res=>{
      this.setData({
        courseList: res.dataList
      })
      this.videoDetail(1)
      // console.log(this.data.courseList)
    })
  },
  // 监听到点击搜索按钮
  searchFN(e) {
    console.log(e.detail.text)
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
  }
})