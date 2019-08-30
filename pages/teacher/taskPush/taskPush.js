const app = getApp();
Page({
  data: {

  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  // 监听到点击搜索按钮
  searchFN(e) {
    console.log(e.detail.text)
  },
  // 监听查看全部按钮
  monitorFN(e){
    let type = e.detail.type;
    // 0 查看全部
    if (type === 0){
      wx.navigateTo({
        url: '../videoPush/videoPush',
      })
    }
  }
})
