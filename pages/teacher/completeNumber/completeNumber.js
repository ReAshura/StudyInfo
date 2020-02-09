// pages/wordDetail/wordDetail.js.
const app = getApp();
Page({
  data: {
    timeStr: '',
    startTime: '',// 开始的
    setTime: '',// 移动的时间
    timer: null,// 定时器函数
    pageEnd: false, // 页面是否加载完毕
    userType: null, // 2教师 3学生
    resourceId: null, // 资源id
    imgSrc: app.globalData.realmName + '/xuegong/uploads/thumbimage/',
    headSrc: app.globalData.realmName + '/xuegong/uploads/userphoto/',
    wordDetail: {}, // 文本信息
    studentType: {}, // 学生学习信息
    isFinished:true, // 已完成  未完成
    studentList:[],
    start:0,
    limit: 8,
    isLimit:0,
    mokeList:[],
    tagId:'',
  },
  onLoad: function (options) {
    this.setData({
      userType: app.globalData.userType,
      resourceId: options.resourceId
    })
    // 获取资源信息
    this.getWordDetail();
    // 获取全部标签
    this.getTagList();
  },
  //上拉更新
  onReachBottom() {
    if (this.data.isLimit === this.data.limit) {
      this.setData({
        start: (this.data.start + this.data.limit)
      })
      this.getPeopleNumer();
    }
  },
  // 获取资源信息
  getWordDetail() {
    app.wxAjax('/course/getResource', { id: this.data.resourceId }).then(res => {
      this.setData({
        wordDetail: res.data
      })
    })
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
      // 获取完成人数
      this.getPeopleNumer();
    })
  },
  // 获取完成人数
  getPeopleNumer(){
    let data = {
      teacherId: app.globalData.userInfo.id,
      resourceId: this.data.resourceId,
      isFinished: this.data.isFinished,
      tagId: this.data.tagId,
      start: this.data.start,
      limit: this.data.limit
    }
    app.wxAjax('/learning/userResourceList', data).then(res => {
      // 2020.01.16日做的标签筛选，后面不用了，换用标签搜索
      // let arr = this.data.mokeList;
      // res.dataList.forEach(item=>{
      //   if (item.tagList && item.tagList.length > 0){
      //     for (let i = 0; i < item.tagList.length; i++) {
      //       if (arr.some(d1 => d1.id === item.tagList[i].id)) {
      //         item.is_activeTag = true;
      //         break;
      //       }
      //     }
      //   }
      // })
      this.setData({
        studentList: this.data.studentList.concat(res.dataList),
        isLimit: res.dataList.length
      })
    })
  },
  // 选择标签
  searchTag(e){
    // console.log(e.currentTarget.dataset.id);
    // if (e.currentTarget.dataset.id === this.data.tagId) return false;
    this.setData({
      tagId: e.currentTarget.dataset.id,
      studentList: [],
      start: 0
    })
    this.getPeopleNumer();
  },
  // 选择人数
  selectFinished(e){
    if (e.target.dataset.bool === this.data.isFinished) return false;
    this.setData({
      isFinished: e.target.dataset.bool,
      studentList:[],
      start:0
    })
    this.getPeopleNumer();
  }
})
