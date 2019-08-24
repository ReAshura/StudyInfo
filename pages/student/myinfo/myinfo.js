// pages/student/myinfo/myinfo.js
Page({
  data: {
    gender: [{ name: '男', val: 1 }, { name: '女', val: 0 }], // 性别选择器
    genderxb:0, // 性别选中下标
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  // 性别选择器change事件
  genderFN(e){
    this.setData({
      genderxb: e.detail.value
    })
    console.log(e)
  }
})