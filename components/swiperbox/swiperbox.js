// pages/components/swiperbox/swiperbox.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bannerList:{
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    network: app.globalData.realmName + '/xuegong/uploads/crouselimage/'
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
