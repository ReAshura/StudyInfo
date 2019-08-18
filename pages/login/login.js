//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    type: 1, // 1代表学生,0代表老师
  },
  onLoad: function (options) {
    
  },

  // 学生与老师之间的切换按钮
  cutFN(){
    this.setData({
      type:this.data.type?0:1
    })
  }
})