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
