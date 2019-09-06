//app.js "sitemapLocation": "sitemap.json"
require('./Mixins.js')
App({
  onLaunch: function () {

  },
  globalData: {
    userType: 2,// 用户状态 2是教师 3是学生 ''是初始状态
    userInfo: {}, // 用户信息
    header: {'content-type': 'application/json'},
    URL:'http://api.govision.cn/xuegong/v1',
    userName:'',// 用户账号
    password:'',// 用户密码
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
  wxAjax(url, data = {}, method="GET", header = this.globalData.header){
    wx.showLoading({ title: '拼命加载中....' })
    return new Promise((resolve,reject)=>{
      wx.request({
        url: this.globalData.URL + url,
        data,
        method,
        header,
        success: (res) => {
          wx.hideLoading();
          if (res.data.result){
            resolve(res.data)
          } else {
            this.wxAlert(res.data.message)
          }
        },
        fail:(e)=>{
          wx.hideLoading();
          this.wxAlert('请求出错')
        }
      })
    });
  }
  
})