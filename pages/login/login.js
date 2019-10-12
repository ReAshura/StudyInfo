//获取应用实例 student1  teacher1
const app = getApp()
Page({
  mixins:[require('../../Mixins.js')],
  data: {
    type: 1, // 1代表学生,0代表老师
    username:'teacher', // 输入的账号
    password:'teacher', // 输入的密码
  },
  onLoad: function (options) {
    
  },
  //登录判断
  loginFN(){
    if(this.data.username.trim() === '' || this.data.password.trim() === ''){
      app.wxAlert('请输入账号密码');
      return false;
    }
    app.wxAjax('/account/login', { userName: this.data.username, password: this.data.password },'POST').then(res => {
      if (res.data.userType === 3) {
        wx.switchTab({
          url: '/pages/student/index/index'
        })
      } else if (res.data.userType === 2) {
        wx.reLaunch({
          url: '/pages/teacher/index/index'
        })
      }else{
        app.wxAlert('暂时仅支持学生和教师入口');
        return false; 
      };
      app.globalData.userType = res.data.userType;
      app.globalData.userInfo = res.data;
      app.globalData.userName = this.data.username;
      app.globalData.password = this.data.password;
    })
  },
  // 学生与老师之间的切换按钮
  // cutFN(){
  //   this.setData({
  //     type:this.data.type?0:1
  //   })
  // },
})