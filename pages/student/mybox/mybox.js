const app = getApp();
Page({
  data: {
    myInfo:{},// 我的个人信息
    network: app.globalData.realmName + '/xuegong/uploads/userphoto/'
  },
  onLoad: function (options) {
    
  },
  onShow(){
    this.getUsetInfo(); // 获取个人信息
  },
  // 获取个人信息
  getUsetInfo(){
    app.wxAjax('/account/getUser', { id: app.globalData.userInfo.id}).then(res=>{
      this.setData({
        myInfo: res.data
      })
      console.log(this.data.myInfo)
    })
  },
  //跳转到积分页面
  jumpJF(){
    wx.navigateTo({
      url: '../integral/integral',
    })
  },
  // 退出登录
  useroutFN(){
    app.globalData.userType = '',
    app.globalData.userInfo = {}
    wx.reLaunch({
      url: '/pages/login/login'
    })
  }
})