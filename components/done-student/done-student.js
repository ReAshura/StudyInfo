// components/done-student/done-student.js
const app = getApp();
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
    dataList:{
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgSrc: app.globalData.realmName + '/xuegong/uploads/userphoto/',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击列表的item
    _itemDetail(e) {
      let myEventDetail = {
        'type': 1, //0查看全部 1 点击列表
        'id': e.currentTarget.dataset.id
      }
      this.triggerEvent('myevent', myEventDetail)
    }
  }
})

