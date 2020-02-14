//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    ScreenHeight: app.globalData.ScreenHeight,
    ScreenWidth: app.globalData.ScreenWidth,
    CustomBar: app.globalData.CustomBar,
    photos: [],
    showPost: false
  },
  onLoad: async function () {
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
  },
  getDatas: function () {
    wx.getImageInfo({
      src: 'https://616e-animal-hiwgd-1301202037.tcb.qcloud.la/cat.jpg?sign=27f2020ef0d97d4c0046951f66c22dcc&t=1581671691',
      success: (res) => {
        const ctx = wx.createCanvasContext('cat-canvas')
        ctx.fillStyle = "#fff"
        ctx.fillRect(0, 0, this.data.ScreenWidth - 50, this.data.ScreenHeight - 180)
        ctx.drawImage(res.path, 0, 0, this.data.ScreenWidth - 50, 220)
        this.getQrcode(ctx)
      }
    })
  },
  getQrcode: function (ctx) {
    wx.getImageInfo({
      src: 'https://616e-animal-hiwgd-1301202037.tcb.qcloud.la/qrcode.jpg?sign=637a6699196cf6800a585d4eb0c0bcc5&t=1581683980',
      success: (res) => {
        ctx.setFontSize(14)
        ctx.fillStyle = '#333'
        ctx.fillText('长按二维码, 一起看萌宠吧!', 20, 260)       
        ctx.drawImage(res.path, this.data.ScreenWidth - 150, 270, 80, 80)
        ctx.draw()
        wx.hideLoading()
        this.setData({
          showPost: true
        })
      }
    })
  },
  viewPost: function () {
    wx.showLoading({
      title: '海报生成中...',
    })
    this.getDatas()
  },
  closePost: function () {
    this.setData({
      showPost: false
    })
  },
  saveToAlbum: function () {
    wx.canvasToTempFilePath({
      canvasId: 'cat-canvas',
      success: (file) => {
        const tempFilePath = file.tempFilePath
        wx.saveImageToPhotosAlbum({
          filePath: tempFilePath,
          success: () => {
            wx.showModal({
              content: '图片已保存到相册，赶紧晒一下吧~',
              showCancel: false,
              confirmText: '好的',
              confirmColor: '#333',
              success: (res) => {
                that.closePost()
                if (res.confirm) {}
              },
              fail: function(res) {
                console.log(res)
              }
            })
          },
          fail: function(res) {
            wx.showToast({
              title: res.errMsg,
              icon: 'none',
              duration: 2000
            })
          }
        })
      }
    })
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
