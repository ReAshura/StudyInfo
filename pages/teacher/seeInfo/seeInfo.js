// pages/teacher/seeInfo/seeInfo.js
import * as echarts from '../../../utils/ec-canvas/echarts';
Page({
  data: {
    ec: {
      onInit: initChart
    }
  },
  onLoad: function (options) {

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