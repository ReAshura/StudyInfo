// pages/student/progresinfo/progresinfo.js
Page({
  data: {
    type:1, // 1视频教材 0文字教材
  },
  onLoad: function (options) {

  },
  //点击选择
  selectFN(e){
    this.setData({
      type: parseInt(e.currentTarget.dataset.id)
    })
  }
})