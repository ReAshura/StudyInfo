// components/vedio-item/vedio-item.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    runAllList:{
      type:Boolean,
      value:false
    },
    searchBtn: {
      type: Boolean,
      value: false
    }, 
    pushBtn: {
      type: Boolean,
      value: false
    },
    dataList:{
      type: Array,
      value: []
    },
    studentType: {
      type: Boolean,
      value: false
    },
    searchPeople: {
      type: Boolean,
      value: false
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgUrl: app.globalData.realmName + '/xuegong/uploads/thumbimage/'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转页面
    _navigatPageFN(e){
      let data = e.currentTarget.dataset
      if (data.url && data.id){
        wx.navigateTo({
          url: data.url + '?resourceId=' + data.id,
        })
      }
    },
    // 点击查看全部
    _lookAll(){
      let myEventDetail = {
        'type': 0
      }
      this.triggerEvent('myevent', myEventDetail)
    },
    // 查看完成人数
    _searchPeople(e) {
      wx.navigateTo({
        url: '/pages/teacher/completeNumber/completeNumber?resourceId=' + e.currentTarget.dataset.id
      })
    }
  }
})
