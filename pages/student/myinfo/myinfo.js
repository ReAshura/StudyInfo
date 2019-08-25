// pages/student/myinfo/myinfo.js
Page({
  mixins: [require('../../../Mixins.js')],
  data: {
    gender: [{ name: '男', val: 1 }, { name: '女', val: 0 }], // 性别选择器
    genderxb:0, // 性别选中下标
    prevMyInfo:{},// 上个页面的个人信息
  },
  onLoad: function (options) {
    let pages = getCurrentPages();
    let pageprev = pages[pages.length - 2];
    this.setData({
      prevMyInfo: pageprev.data.myInfo,
      genderxb: pageprev.data.myInfo.gender === '男'?1:0
    })
  },
  // 选择图片
  setimg(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res)=>{
        // tempFilePath可以作为img标签的src属性显示图片
        // const tempFilePaths = res.tempFilePaths[0]
        // var fs = wx.getFileSystemManager()
        // console.log(fs.readFileSync(tempFilePaths))
        // wx.getFileInfo({
        //   filePath: tempFilePaths,

        //   success:(res) => {
        //     console.log(res)
        //     console.log(res.digest)
        //   }
        // })
        // console.log(tempFilePaths)
      }
    })
  },
  // 性别选择器change事件
  genderFN(e){
    this.setData({
      genderxb: e.detail.value
    })
    console.log(e)
  }
})