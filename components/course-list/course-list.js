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
    _lookAll() {
      let myEventDetail = {
        'type': 0 //0查看全部 1 点击列表
      }
      this.triggerEvent('myevent', myEventDetail)
    },
    // 点击列表的item
    _itemDetail(e){
      let myEventDetail = {
        'type': 1, //0查看全部 1 点击列表
        'id': e.currentTarget.dataset.id
      }
      
      this.triggerEvent('myevent', myEventDetail)
    }
  }
})
