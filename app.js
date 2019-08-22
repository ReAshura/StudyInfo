//app.js "sitemapLocation": "sitemap.json"
App({
  onLaunch: function () {

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //     }else{
    //     }
    //   }
    // })


    // wx.getUserInfo({
    //   success: res => {
    //     // 可以将 res 发送给后台解码出 unionId
    //     this.globalData.userInfo = res.userInfo
    //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //     // 所以此处加入 callback 以防止这种情况
    //     if (this.userInfoReadyCallback) {
    //       this.userInfoReadyCallback(res)
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    header: {'content-type': 'application/json'},
    URL:'https:www.baidu.com',
  },
  // 封装 alert 弹出框
  wxAlert(str){
    wx.showModal({
      title: '提示',
      content: str,
      showCancel:false,
      confirmText:'知道啦~',
      confirmColor:'#29833c'
    })
  },
  // 封装请求
  wxAjax(url, method="GET",data = {}, header = this.globalData.header){
    return new Promise((resolve,reject)=>{
      wx.request({
        url: this.globalData.URL,
        method,
        data,
        header,
        success(res) {
          resolve(res.data)
        },
        fail(e){
          this.wxAlert('请求出错')
        }
      })
    });
  }
  
})