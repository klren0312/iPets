//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    photos: []
  },
  onLoad: function () {
    try {
      var value = wx.getStorageSync('noFirst')
      if (value) {
        wx.navigateTo({
          url: '/pages/photos/photos'
        })
      }
    } catch (e) {
      wx.setStorage({
        key: 'noFirst',
        data: true
      })
    }
    // this.getDatas()
  },
  toDetails: function () {
    wx.navigateTo({
      url: '/pages/photos/photos'
    })
  },
  onShareAppMessage: function () {
    return {
      title: 'i宠家-宠物图集',
      path: '/pages/index/index'
    }
  }
})
