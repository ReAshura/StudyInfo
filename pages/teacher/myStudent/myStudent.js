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
    mokeList:[],
    activTag:'',
    ajaxEnd:false
  },
  onLoad: function (options) {
    // 获取老师所有的学生
    this.getMyStudent();
    // 获取全部标签
    this.getTagList();
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
  // 获取全部标签
  getTagList() {
    let data = {
      teacherId: app.globalData.userInfo.id,
      name: '',
      start: 0,
      limit: -1
    }
    app.wxAjax('/account/teacherTagList', data).then(res => {
      this.setData({
        mokeList: res.dataList
      })
    })
  },
  selectTag(e){
    if (this.data.activTag === e.currentTarget.dataset.id){
      this.setData({ activTag: '' })
    }else {
      this.setData({ activTag: e.currentTarget.dataset.id })
    }
    this.setData({
      page: 0,
      studentList: []
    })
    // 获取老师所有的学生
    this.getMyStudent();
    // console.log(e);
  },
  // 获取老师所有的学生
  getMyStudent(){
    this.setData({ ajaxEnd:false })
    let data = {
      studentName:this.data.searchStr,
      teacherId: app.globalData.userInfo.id,
      start: this.data.page,
      limit: this.data.limit,
      teacherTagId: this.data.activTag
    }
    app.wxAjax('/account/studentList',data).then(res=>{
      this.setData({
        studentList: this.data.studentList.concat(res.dataList),
        isLimit: res.dataList.length,
        ajaxEnd: true
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
    // console.log(this.data.searchStr)
    // 获取老师所有的学生
    this.getMyStudent();
  },
})