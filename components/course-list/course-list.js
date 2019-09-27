Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否显示查看全部按钮
    runAllList: {
      type: Boolean,
      value: false
    },
    // 是否显示 头部信息
    titleShow: {
      type: Boolean,
      value: false
    },
    // 按钮变成 查看完成人数【默认：未完成】
    searchBtn: {
      type: Boolean,
      value: false
    },
    // 按钮变成 上传的字样【默认：未完成】
    pushBtn: {
      type: Boolean,
      value: false
    },
    // 标题文字 
    titleText: {
      type: String,
      value: '课程列表'
    },
    // 数据 
    dataList: {
      type:Array,
      value:[]
    },
    // 测试标签【默认：不带标签】
    tag: {
      type:Boolean,
      value:false
    },
    // 是否显示进度
    speed:{
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
