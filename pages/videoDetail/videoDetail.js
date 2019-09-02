// pages/videoDetail/videoDetail.js
const app = getApp()
Page({
  data: {
    timeStr:'',
    startTime: '',// 开始的
    setTime:'',// 移动的时间
    timer:null,// 定时器函数
    userType:null
  },
  onLoad: function (options) {
    this.setData({
      userType: app.globalData.userType
    })
    let isTime = new Date().setHours(0, 0, 0, 0);
    this.setData({
      startTime: isTime,
      setTime:isTime + (1 * 60000)
    })
    this.setData({
      timer: setInterval(this.dsqFN, 1000)
    })
  },
  onShow: function () {

  },
  // 视频播放完毕出发
  endVideo() { 
    wx.showToast({
      title: '播放完毕啦~',
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
      clearInterval(this.data.timer)
    }
  },
  // 将时间转化成字符串
  startTime(time) {
    const Time = new Date(time);
    return `${Time.getHours() >= 10 ? Time.getHours() : '0' + Time.getHours()} : ${Time.getMinutes() >= 10 ? Time.getMinutes() : '0' + Time.getMinutes()} : ${Time.getSeconds() >= 10 ? Time.getSeconds() : '0' + Time.getSeconds()}`
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.data.timer)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.timer)
  },
})
