// pages/teacher/myStudent/myStudent.js
const app = getApp();
Page({
  data: {
    searchStr:'', // 
    page:0, // 分页
    limit:10, // 页面容量
    isLimit:0, // 当前获取了多少数据
    studentList:[], // 学生列表
    imgSrc: app.globalData.realmName + '/xuegong/uploads/userphoto/',
  },
  onLoad: function (options) {
    // 获取老师所有的学生
    this.getMyStudent();
  },
  //上拉更新
  onReachBottom() {
    if (this.data.isLimit === this.data.limit) {
      this.setData({
        page: (this.data.page + this.data.limit)
      })
      this.getMyStudent();
    }
  },
  // 获取老师所有的学生
  getMyStudent(){
    let data = {
      studentName:this.data.searchStr,
      teacherId: app.globalData.userInfo.id,
      start: this.data.page,
      limit: this.data.limit
    }
    app.wxAjax('/account/studentList',data).then(res=>{
      this.setData({
        studentList: this.data.studentList.concat(res.dataList),
        isLimit: res.dataList.length
      })
    })
  },
  // 监听到点击搜索按钮
  searchFN(e) {
    this.setData({
      searchStr: e.detail.text,
      page:0,
      studentList:[]
    })
    console.log(this.data.searchStr)
    // 获取老师所有的学生
    this.getMyStudent();
  },
})