// pages/student/myinfo/myinfo.js
const app = getApp();
Page({
  mixins: [require('../../../Mixins.js')],
  data: {
    gender: ['男', '女', ''], // 性别选择器
    genderxb:0, // 性别选中下标
    prevMyInfo:{},// 上个页面的个人信息
    tempFilePath:'', // 头像
    network: app.globalData.realmName + '/xuegong/uploads/userphoto/'
  },
  onLoad: function (options) {
    let pages = getCurrentPages();
    let pageprev = pages[pages.length - 2];
    this.setData({
      prevMyInfo: pageprev.data.myInfo,
      genderxb: pageprev.data.myInfo.gender === '男' ? 0 : pageprev.data.myInfo.gender === '女'?1:2
    })
  },
  // 选择图片
  setimg(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res)=>{
        this.setData({
          tempFilePath: res.tempFilePaths[0]
        })
      }
    })
  },
  // 提交数据
  submitFN(){
    let data = {
      id: app.globalData.userInfo.id,
      gender: this.data.gender[this.data.genderxb],
      trueName: this.data.prevMyInfo.trueName
    }
    // if (this.data.tempFilePath === ''){
      // data.photo = this.data.prevMyInfo.photo
      app.wxAjax('/account/updateUser',data,'POST').then(res=>{
        if (res.result){
          setTimeout((res) => {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)
          wx.showToast({
            title: '保存成功...',
            mask: true,
            duration: 1500
          })
        }else{
          app.wxAlert(res.message)
        }
      })
    // }else{
    //   wx.uploadFile({
    //     url: app.globalData.URL +'/account/updateUser',
    //     filePath: this.data.tempFilePath,
    //     name: 'file',
    //     formData: data,
    //     success(res) {
    //       res = JSON.parse(res.data)
    //       if (res.result) {
    //         setTimeout(() => {
    //           wx.navigateBack({
    //             delta: 1
    //           })
    //         },1500)
    //         wx.showToast({
    //           title: '保存成功...',
    //           mask: true,
    //           duration: 1500
    //         })
    //       } else {
    //         app.wxAlert(res.message)
    //       }
    //     }
    //   })
    // }
  },
  // 性别选择器change事件
  genderFN(e){
    this.setData({
      genderxb: e.detail.value
    })
  }
})