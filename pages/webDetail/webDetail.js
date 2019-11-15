// pages/wordDetail/wordDetail.js.
const app = getApp();
Page({
  data: {
    timeStr: '',
    startTime: '',// 开始的
    setTime: '',// 移动的时间
    timer: null,// 定时器函数
    pageEnd: false, // 页面是否加载完毕
    userType: null, // 2教师 3学生
    resourceId: null, // 资源id
    imgSrc: app.globalData.realmName + '/xuegong/uploads/thumbimage/',
    wordDetail: {}, // 文本信息
    studentType: {}, // 学生学习信息
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      userType: app.globalData.userType,
      resourceId: options.resourceId
    })
    // 分辨学生和老师
    if (this.data.userType == 3) {
      // 学生 获取学生的资料
      this.getStudentDetail();
    }
    // 获取资源信息
    this.getWordDetail();
  },
  // 获取资源信息
  getWordDetail() {
    app.wxAjax('/course/getResource', { id: this.data.resourceId }).then(res => {
      this.setData({
        wordDetail: res.data
      })
    })
  },
  // 获取学生的资料
  getStudentDetail() {
    let data = {
      userId: app.globalData.userInfo.id,
      resourceId: this.data.resourceId
    }
    app.wxAjax('/learning/getUserResource', data).then(res => {
      this.setData({ studentType: res })
    })
  },
  // 网页加载结束
  endTimeOut() {
    if (this.data.userType == 3 && this.data.studentType.data.status!=3){
      let data = {
        userId: app.globalData.userInfo.id,
        resourceId: this.data.resourceId,
        status: 3
      }
      app.wxAjax('/learning/updateUserCourseLearningLogStatus', data, 'POST').then(res => {
        var pages = getCurrentPages();
        var page1 = pages[pages.length - 2];//上一页
        var page2 = pages[pages.length - 3];//上两页
        if (typeof page1.getcourseDetail === 'function') page1.getcourseDetail();
        if (typeof page2.getcourseList === 'function') page2.getcourseList();
        this.setData({
          ['studentType.data.status']: 3
        })
      })
    };
  },
})
