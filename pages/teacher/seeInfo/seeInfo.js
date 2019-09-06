// pages/teacher/seeInfo/seeInfo.js
import * as echarts from '../../../utils/ec-canvas/echarts';
Page({
  data: {
    popbool:false,// true
    type:0,
    mokeList: [{ id: 0, name: '全部老师' }, { id: 1, name: '老师设置的标签2' }, { id: 2, name: '老师设置的标签3' }, { id: 3, name: '老师设置的标签4' }],
    currList: [{ id: 0, name: '全部老师' }],// 当前选中的标签
    ec: {
      onInit: initChart
    }
  },
  onLoad: function (options) {

  },
  // 点击切换任务的状态
  tasktypeFN(e){
    this.setData({
      type: e.currentTarget.dataset.id
    })
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
      arr.push(this.data.mokeList[xb])
    }
    this.setData({
      currList: arr
    })
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
})

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
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
      data: [{ value: 20, name: '未完成' }, { value: 60, name: '完成' }],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 2, 2, 0.3)'
        }
      }
    }]
  };
  chart.setOption(option);
  return chart;
}