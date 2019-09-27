// pages/student/integral/integral.js
const app = getApp();
Page({
  data: {
    dataList:[],
  },
  onLoad: function () {
    // 获取该学生的积分情况
    this.getIntegral();
  },
  // 获取该学生的积分情况
  getIntegral(){
    let data = {
      courseId:'',
      studentId: app.globalData.userInfo.id,
      start:1,
      limit:-1
    }
    app.wxAjax('/learning/studentPointList', data).then(res=>{
      console.log(res)
    })
  }
})