//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    photos: []
  },
  onLoad: function () {
    // this.getDatas()
  },
  toDetails: function () {
    wx.navigateTo({
      url: '/pages/photos/photos'
    })
  },
  getDatas: function () {
    const db = wx.cloud.database()
    db.collection('animal')
      .skip(Math.floor(Math.random() * 50))
      .limit(4)
      .get()
      .then(res => {
        this.setData({
          photos: res.data
        })
        wx.hideLoading()
      })
      .catch(() => {
        wx.hideLoading()
      })
  },
  onShareAppMessage: function () {
    return {
      title: 'i宠家-宠物图集',
      path: '/pages/index/index'
    }
  }
})
