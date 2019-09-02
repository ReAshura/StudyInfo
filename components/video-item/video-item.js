// components/vedio-item/vedio-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    runAllList:{
      type:Boolean,
      value:false
    },
    titleShow: {
      type: Boolean,
      value: false
    },
    searchBtn: {
      type: Boolean,
      value: false
    }, 
    pushBtn: {
      type: Boolean,
      value: false
    },
    titleText: {
      type: String,
      value: '视频教材'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击查看全部
    _lookAll(){
      let myEventDetail = {
        'type': 0
      }
      this.triggerEvent('myevent', myEventDetail)
    }
  }
})
