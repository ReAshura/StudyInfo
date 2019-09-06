Page({
  data: {

  },
  onLoad: function (options) {

  },
  //课程列表点击
  listFN(e) {
    if (e.detail.type === 1) {
      wx.navigateTo({
        url: '../progresinfo/progresinfo',
      })
    }
  }
})