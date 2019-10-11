const app = getApp();
Page({
  data: {
    searchStr:'',  // 搜索的内容
  },
  onLoad: function (options) {
    // 获取学生所学课程列表
    this.getcourseList();
  },
  // 获取学生所学课程列表
  getcourseList() {
    let data = {
      courseName: this.data.searchStr,
      userId: app.globalData.userInfo.id,
      isFinished:false
    }
    app.wxAjax('/learning/userCourseInfoList', data).then(res => {
      this.setData({
        courseList: res.dataList
      })
    })
  },
  // 点击搜索
  searchFN(e){
    this.setData({
      searchStr: e.detail.text
    })
    // 获取学生所学课程列表
    this.getcourseList();
  },
  //课程列表点击
  listFN(e) {
    if (e.detail.type === 1) {
      wx.navigateTo({
        url: '../../courseList/courseList?courseId=' + e.detail.id,
      })
    }
  }
})