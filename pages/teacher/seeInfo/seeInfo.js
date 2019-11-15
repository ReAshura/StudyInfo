// pages/teacher/seeInfo/seeInfo.js
import * as echarts from '../../../utils/ec-canvas/echarts';
var cahrtList = [];
const app = getApp();
Page({
  data: {
    popbool:false,// true
    type: 3, // 已完成， 未完成课程
    mokeList: [],
    currList: [],// 学生的标签
    studentInfo:{}, // 学生的信息
    imgSrc: app.globalData.realmName + '/xuegong/uploads/userphoto/',
    ec: { lazyLoad: true },// 延迟加载
    piedata:[], // 图形数据
    courseList:[], // 该学生 已完成 未完成 的课程
    echartsComponnet:{},// echart DOM
  },
  onLoad: function (options) {
    this.echartsComponnet = this.selectComponent('#mychart-dom-bar');
    this.setData({
      studentid: options.id
    })
    // 获取学生标签
    this.getStudenTag();
    // 获取全部标签
    this.getTagList();
    // 获取学生的完成情况
    this.getStudentState();
    // 获取学生信息
    this.getStudentInfo();
    // 获取已/未完成课程
    this.getStudentStatus();
    // 获取学生信息
    console.log(options)
  },
  // 获取学生标签
  getStudenTag(){
    let data = {
      teacherId: app.globalData.userInfo.id,
      studentId: this.data.studentid
    }
    app.wxAjax('/account/studentTagList', data).then(res=>{
      this.setData({
        currList:res.dataList
      })
    })
  },
  // 获取全部标签
  getTagList() {
    let data = {
      teacherId: app.globalData.userInfo.id,
      name: '',
      start: 1,
      limit: -1
    }
    app.wxAjax('/account/teacherTagList', data).then(res => {
      this.setData({
        mokeList: res.dataList
      })
    })
  },
  // 删除某个标签
  removeTgaFN(e){
    wx.showModal({
      title: '提示',
      content: '您确定要删除这个标签吗？',
      success: (res) => {
        if (res.confirm) {
          let data = {
            studentId: this.data.studentid,
            tagId: e.currentTarget.dataset.id
          }
          app.wxAjax('/account/deleteStudentTag',data,'POST').then(res=>{
            this.getStudenTag();
            this.setData({
              popbool:false
            })
          })
        }
      }
    })
    // 
  },
  // 获取学生的完成情况
  getStudentState(){
    let data = {
      studentId: this.data.studentid,
      teacherId: app.globalData.userInfo.id
    }
    app.wxAjax('/learning/getUserResourceStat',data).then(res=>{
      cahrtList = [{ value: res.data.unFinishedCount, name: '未完成' }, { value: res.data.finishedCount, name: '完成' }]
      this.init_echarts();//初始化图表
    })
  },
  // 获取学生信息
  getStudentInfo(){
    app.wxAjax('/account/getUser', { id: this.data.studentid}).then(res=>{
      this.setData({
        studentInfo: res.data
      })
    })
  },
  // 获取已/未完成课程
  getStudentStatus(){
    let data = {
      userId: this.data.studentid,
      status: this.data.type
    }
    app.wxAjax('/learning/userCourseInfoList', data).then(res=>{
      this.setData({
        courseList:res.dataList
      })
    })
  },
  // 点击切换任务的状态
  tasktypeFN(e){
    if (this.data.type === e.currentTarget.dataset.id) return false;
    this.setData({
      type: e.currentTarget.dataset.id
    })
    this.getStudentStatus();
  },
  // 监听点击学生任务
  courseEvent(e){
    let type = e.detail.type;
    if(type === 1){
      wx.navigateTo({
        url: '../../courseList/courseList',
      })
    }
  },
  // 显示弹窗
  pushBtn(id) {
    console.log(id)
    this.setData({
      popbool: true
    })
  },
  // 点击t添加
  addTag(e) {
    let xb = e.currentTarget.dataset.id;
    let arr = this.data.currList;
    let bool = arr.some(item => item.id === this.data.mokeList[xb].id);
    if (!bool) {
      let data = {
        studentId: this.data.studentid,
        tagId: this.data.mokeList[xb].id
      }
      app.wxAjax('/account/addStudentTag',data,'POST').then(res=>{
        arr.push(this.data.mokeList[xb])
        this.setData({
          currList: arr
        })
      })
    }
  },
  // 删除标签
  removeItem(e) {
    let xb = e.currentTarget.dataset.id
    let arr = this.data.currList;
    arr.splice(xb, 1);
    this.setData({
      currList: arr
    })
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
  //初始化图表
  init_echarts: function () {
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      Chart.setOption(this.getOption());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },
  getOption(){
    let option = {
      backgroundColor: "#ffffff",
      color: ["#2e4554", "#c23431"],
      title: {
        text: '任务完成度',
        subtext: '数据展示',
        x: 'center'
      },
      series: [{
        label: {
          normal: {
            fontSize: 14
          }
        },
        type: 'pie',
        center: ['50%', '60%'],
        radius: [0, '60%'],
        data: cahrtList,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 2, 2, 0.3)'
          }
        }
      }]
    };
    return option
  }
})


// function initChart(canvas, width, height,data) {
//   console.log(canvas, width, height,data)
//   const chart = echarts.init(canvas, null, {
//     width: width,
//     height: height
//   });
//   canvas.setChart(chart);

//   var option = {
//     backgroundColor: "#ffffff",
//     color: ["#2e4554", "#c23431"],
//     title: {
//       text: '任务完成度',
//       subtext: '数据展示',
//       x: 'center'
//     },
//     series: [{
//       label: {
//         normal: {
//           fontSize: 14
//         }
//       },
//       type: 'pie',
//       center: ['50%', '60%'],
//       radius: [0, '60%'],
//       data: [{ value: 20, name: '未完成' }, { value: 60, name: '完成' }],
//       itemStyle: {
//         emphasis: {
//           shadowBlur: 10,
//           shadowOffsetX: 0,
//           shadowColor: 'rgba(0, 2, 2, 0.3)'
//         }
//       }
//     }]
//   };
//   chart.setOption(option);
//   return chart;
// }