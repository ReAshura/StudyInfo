const app = getApp();
Page({
  data: {
    myInfo:{},// 我的个人信息
  },
  onLoad: function (options) {
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
  }
})