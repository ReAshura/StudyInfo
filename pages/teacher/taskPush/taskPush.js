const app = getApp();
Page({
  data: {
    courseList:[], // 课程列表
    popbool:false,
    mokeList: [],
    currList:[],// 当前选中的标签
    searchText:'', // 搜索内容
    currIndex:null , // 当前课程下标
    limit: 10, // 页面容量
    isLimit: 0, // 当前获取了多少数据
    page: 0, // 分页
    ajaxEnd: false, // 请求是否完成 ， 只为了UI切换
    courseType:1, // 课程类型 1学生部 2保卫处
  },
  onLoad: function (options) {
    // 获取课程列表
    this.getCourseList();
    // 获取标签列表
    this.getTagList();
  },
  //上拉更新
  onReachBottom() {
    if (this.data.isLimit === this.data.limit) {
      this.setData({
        page: (this.data.page + this.data.limit)
      })
      this.getCourseList();
    }
  },
  // 获取课程列表
  getCourseList() {
    let data =  { 
      code: '', 
      name: this.data.searchText, 
      teacherId: app.globalData.userInfo.id, 
      courseType: this.data.courseType,
      isPublished: false,
      start: this.data.page, 
      limit: this.data.limit 
    }
    app.wxAjax('/course/courseInfoList', data).then(res => {
      this.setData({
        courseList: this.data.courseList.concat(res.dataList),
        isLimit: res.dataList.length,
        ajaxEnd:true
      })
    })
  },
  // 切换课程类别，1学生处 2保卫处
  selectTypeFN(e){
    if (e.target.dataset.id){
      this.setData({
        courseType: e.target.dataset.id,
        page: 0, // 分页
        ajaxEnd:false,
        courseList: []
      })
      // 获取课程列表
      this.getCourseList();
    }
  },
  // 获取标签列表
  getTagList(){
    let data = {
      teacherId: app.globalData.userInfo.id,
      name:'',
      start:0,
      limit:-1
    }
    app.wxAjax('/account/teacherTagList',data).then(res=>{
      this.setData({
        mokeList: res.dataList
      })
    })
  },
  // 弹起发布弹窗
  pushBtn(xb){
    // 只能未发布才可以点击-----暂允许所有
    // if (!this.data.courseList[xb].isPublished){
    this.setData({
      popbool: true,
      currIndex:xb,
      currList: this.data.courseList[xb].tagList ? this.data.courseList[xb].tagList:[]
    })
    // }else{
    //   wx.showToast({
    //     title: '该课程已发布'
    //   })
    // }
  },
  // 发布课程
  pushCurse(){
    wx.showModal({
      title: '提示',
      content: '您确定要修改该标签的课程吗？',
      success: (res) => {
        let xb = this.data.currIndex
        if (res.confirm && xb !== null) {
          let arr = [];
          this.data.currList.forEach(item => arr.push(item.id))
          let data = {
            teacherId: app.globalData.userInfo.id, 
            courseId: this.data.courseList[xb].courseId,
            isPublished: true,
            tagIdList: arr.toString()
          }
          app.wxAjax('/course/updateCourseInfo',data,'POST').then(res=>{
            this.setData({
              popbool: false,
              currIndex: null,
              page: 0, // 分页
              courseList: [],
              ajaxEnd:false
            })

            this.getCourseList();
            let prevPage = getCurrentPages()[getCurrentPages().length - 2];
            if (typeof prevPage.getCourseList === 'function'){
              prevPage.getCourseList();
            }
          })
        }
      }
    })
  },
  // 点击t添加
  addTag(e){
    let xb = e.currentTarget.dataset.id;
    let arr = this.data.currList;
    let bool = arr.some(item => item.id === this.data.mokeList[xb].id);
    if(!bool){
      arr.push(this.data.mokeList[xb])
    }
    this.setData({
      currList: arr
    })
  },
  // 删除标签
  removeItem(e){
    let xb = e.currentTarget.dataset.id
    let arr = this.data.currList;
    arr.splice(xb, 1);
    this.setData({
      currList:arr
    })
  },
  // 监听到点击搜索按钮
  searchFN(e) {
    this.setData({
      searchText: e.detail.text,
      page: 0, // 分页
      ajaxEnd:false,
      courseList: []
    })
    // 获取课程列表
    this.getCourseList();
  },
  // 监听查看全部按钮
  monitorFN(e){
    let type = e.detail.type;
    // 0 查看全部
    if (type === 0){
      wx.navigateTo({
        url: '../videoPush/videoPush',
      })
    } else if (type === 1){
      this.pushBtn(e.detail.index)
    }
  },
  //阻止冒泡
  stopclose() {
    return false;
  },
  //确认发布
  closepop() {
    this.setData({
      popbool: false,
      currIndex:null
    })
  },
})
