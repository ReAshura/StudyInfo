// pages/teacher/taskView/taskView.js
const app = getApp();
Page({
  data: {
    
  },
  onLoad: function (options) {
    
  },
  onShow: function () {
    
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
  // 监听到点击搜索按钮
  searchFN(e){
    console.log(e.detail.text)
  }
})
