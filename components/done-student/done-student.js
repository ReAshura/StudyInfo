// components/done-student/done-student.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    runAllList: {
      type: Boolean,
      value: false
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
    test(e){
      console.log(e)
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    }
  }
})

