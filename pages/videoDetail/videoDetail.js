// pages/videoDetail/videoDetail.js
const app = getApp()
Page({
  data: {
    timeStr:'',
    startTime: '',// 开始的
    setTime:'',// 移动的时间
    timer:null,// 定时器函数
    userType:null, // 2教师 3学生
    pageEnd:false,// 页面是否加载完毕
    denotype:0,// 老师视角:学生完成状态
    resourceId:'', // 资源id
    videoDetail:{}, // 资源详情
    studentObj:{}, // 学生的完成情况
    videoSrc: app.globalData.realmName + '/xuegong/uploads/resourcefile/',
    imgSrc: app.globalData.realmName + '/xuegong/uploads/thumbimage/',
    currSrc:'', // 当前视频
    autoplay:false, // 是否自动播放
  },
  onLoad: function (options) {
    this.setData({
      userType: app.globalData.userType,
      resourceId: options.resourceId
    })
    // 获取资源信息
    this.getDetail();
    if (this.data.userType == 3) {
      // 学生----获取资源信息
      this.getStudentResource();
    };
    
  },
  onShow: function () {
    if (this.data.pageEnd && this.data.userType == 3 && this.data.studentObj.data.status !== 3){
      this.setData({
        timer: setInterval(this.dsqFN, 1000)
      })
    }
  },
  // 获取资源信息
  getDetail(){
    app.wxAjax('/course/getResource', { id: this.data.resourceId }).then(res => {
      this.setData({
        videoDetail: res.data
      })
    })
  },
  // 学生----获取资源信息
  getStudentResource(){
    let data = {
      userId: app.globalData.userInfo.id,
      resourceId: this.data.resourceId
    }
    app.wxAjax('/learning/getUserResource', data).then(res=>{
      this.setData({ studentObj:res })
      if (res.data.status !== 3) {
        // 未完成时 开始倒计时
        this.actionTimeOut(res.data.finishedTime)
      } else {
        this.setData({
          timeStr: '已完成'
        })
      }
    })
  },
  // 视频播放完毕出发
  endVideo() { 
    wx.showToast({
      title: '播放完毕啦~',
    })
  },
  // 开始倒计时
  actionTimeOut(ms){
    let isTime = new Date().setHours(0, 0, 0, 0);
    this.setData({
      startTime: isTime,
      setTime: isTime + (ms * 60000)
    })
    this.setData({
      timer: setInterval(this.dsqFN, 1000)
    })
  },
  // 定时器内使用的函数体
  dsqFN(){
    let isTime = this.data.setTime - 1000
    this.setData({
      setTime: isTime,
      timeStr: this.startTime(isTime)
    })
    if (this.data.setTime <= this.data.startTime) {
      clearInterval(this.data.timer);
      // 时间播放结束
      this.endTimeOut();
    }
  },
  // 结束倒计时
  endTimeOut() {
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
        timeStr: '已完成',
        ['studentObj.data.status']: 3
      })
    })
  },
  // 将时间转化成字符串
  startTime(time) {
    const Time = new Date(time);
    return `${Time.getHours() >= 10 ? Time.getHours() : '0' + Time.getHours()} : ${Time.getMinutes() >= 10 ? Time.getMinutes() : '0' + Time.getMinutes()} : ${Time.getSeconds() >= 10 ? Time.getSeconds() : '0' + Time.getSeconds()}`
  },
  // 点击切换任务的状态
  tasktypeFN(e) {
    this.setData({
      denotype: e.currentTarget.dataset.id
    })
  },
  // 点击观看
  watchFN(e){
    this.setData({
      currSrc: this.data.videoSrc + e.currentTarget.dataset.src,
      autoplay:true
    })
  },
  onReady: function () {
    this.setData({
      pageEnd:true
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
  },
})
