const app = getApp();
Page({
  data: {
    
  },
  onLoad: function (options) {
    if (!app.globalData.userType) {
      app.wxAlert('账号信息错误，请删除重试')
      return false;
    }
    // 获取课程列表
    this.getCourseList();
  },
  // 获取课程列表
  getCourseList(){
    app.wxAjax('/course/courseInfoList', { code: '', name: '', teacherId: app.globalData.userInfo.id, start: 1, limit:-1}).then(res=>{
      console.log(res)
    })
  },
  // 监听视频点击
  monitorFN(e){
    console.log(e)
  },
  //监听学生任务
  onMyEvent(e){
    let type = e.detail.type;
    // 0 查看全部
  },
})