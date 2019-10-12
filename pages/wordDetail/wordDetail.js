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
    resourceId:null, // 资源id
    imgSrc: app.globalData.realmName + '/xuegong/uploads/thumbimage/',
    wordDetail:{}, // 文本信息
    studentType:{}, // 学生学习信息
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      userType: app.globalData.userType,
      resourceId: options.resourceId
    })
    // 获取资源信息
    this.getWordDetail();
    // 分辨学生和老师
    if (this.data.userType == 3) {
      // 学生 获取学生的资料
      this.getStudentDetail();
    }
  },
  // 获取资源信息
  getWordDetail(){
    app.wxAjax('/course/getResource', { id: this.data.resourceId}).then(res=>{
      this.setData({
        wordDetail:res.data
      })
    })
  },
  // 获取学生的资料
  getStudentDetail(){
    let data = {
      userId: app.globalData.userInfo.id,
      resourceId: this.data.resourceId
    }
    app.wxAjax('/learning/getUserResource', data).then(res => {
      this.setData({studentType: res})
      if (res.data.status !== 3){
        // 未完成时 开始倒计时
        this.actionTimeOut(res.data.finishedTime)
      }else{
        this.setData({
          timeStr:'已完成'
        })
      }
    })
  },
  // 开始倒计时
  actionTimeOut(ms) {
    let isTime = new Date().setHours(0, 0, 0, 0);
    this.setData({
      startTime: isTime,
      setTime: isTime + (ms * 1000)
    })
    this.setData({
      timer: setInterval(this.dsqFN, 1000)
    })
  },
  // 结束倒计时
  endTimeOut(){
    let data = {
      userId: app.globalData.userInfo.id,
      resourceId: this.data.resourceId,
      status: 3
    }
    app.wxAjax('/learning/updateUserCourseLearningLogStatus', data,'POST').then(res=>{
      var pages = getCurrentPages();
      var page1 = pages[pages.length - 2];//上一页
      var page2 = pages[pages.length - 3];//上两页
      if (typeof page1.getcourseDetail === 'function') page1.getcourseDetail();
      if (typeof page2.getcourseList === 'function') page2.getcourseList();
      this.setData({
        timeStr: '已完成',
        ['studentType.data.status']:3
      })
    })
  },
  // 定时器内使用的函数体
  dsqFN() {
    let isTime = this.data.setTime - 1000
    this.setData({
      setTime: isTime,
      timeStr: this.startTime(isTime)
    })
    if (this.data.setTime <= this.data.startTime) {
      // 发送完成信息
      this.endTimeOut()
      clearInterval(this.data.timer)
    }
  },
  // 将时间转化成字符串
  startTime(time) {
    const Time = new Date(time);
    return `${Time.getHours() >= 10 ? Time.getHours() : '0' + Time.getHours()} : ${Time.getMinutes() >= 10 ? Time.getMinutes() : '0' + Time.getMinutes()} : ${Time.getSeconds() >= 10 ? Time.getSeconds() : '0' + Time.getSeconds()}`
  },
  onShow: function () {
    if (this.data.pageEnd && this.data.userType == 3 && this.data.studentType.data.status !== 3) {
      this.setData({
        timer: setInterval(this.dsqFN, 1000)
      })
    }
  },
  onReady: function () {
    this.setData({
      pageEnd: true
    })
  },
  onHide: function () {
    if (this.data.userType == 3 && this.data.timer) {
      clearInterval(this.data.timer)
    }
  },
  onUnload: function () {
    if (this.data.userType == 3 && this.data.timer) {
      clearInterval(this.data.timer)
    }
  }
})
