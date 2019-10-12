const app = getApp();
Page({
  data: {
    popbool:false,
    mokeList: [{ id: 0, name: '全部老师' }, { id: 1, name: '老师设置的标签2' }, { id: 2, name: '老师设置的标签3' }, { id: 3, name: '老师设置的标签4' }],
    currList:[],// 当前选中的标签
  },
  onLoad: function (options) {
    // 获取课程列表
    this.getCourseList();
  },
  // 获取课程列表
  getCourseList() {
    app.wxAjax('/course/courseInfoList', { code: '', name: '', teacherId: app.globalData.userInfo.id, start: 1, limit: -1 }).then(res => {
      this.setData({
        courseList: res.dataList
      })
    })
  },
  // 点击发布按钮
  pushBtn(id){
    this.setData({
      popbool: true
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
    console.log(e.detail.text)
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
      this.pushBtn(e.detail.id)
    }
  },
  //阻止冒泡
  stopclose() {
    return false;
  },
  //关闭弹窗
  closepop() {
    this.setData({
      popbool: false
    })
  },
})
