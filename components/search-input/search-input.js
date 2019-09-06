// components/search-input/search-input.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:'请输入要查找的课程'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    searchText:'',// 搜索内容
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击搜索
    _searchFN(e){
      let myEventDetail = {
        'text': this.data.searchText
      }
      this.triggerEvent('myevent', myEventDetail)
    },
    // 设置文字
    _setText(e){
      this.setData({
        searchText: e.detail.value
      })
    }
  }
})
