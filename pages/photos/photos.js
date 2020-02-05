// pages/photos/photos.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    page: 0,
    dogPage: 0,
    catPhotos: [],
    dogPhotos: [],
    activeTab: 'cat'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDatas()
  },
  active: function (e) {
    this.setData({
      activeTab: e.currentTarget.dataset.type
    })
    if (this.data.activeTab === 'dog' && this.data.dogPhotos.length === 0) {
      this.getDogs()
    }
  },
  getDatas: function () {
    wx.showLoading({
      title: '正在赶来🐱'
    })
    const db = wx.cloud.database()
    db.collection('animal')
      .orderBy('id', 'asc')
      .skip(this.data.page)
      .limit(20)
      .get()
      .then(res => {
        const total = this.data.catPhotos.concat(res.data)
        this.setData({
          catPhotos: total
        })
        wx.hideLoading()
      })
      .catch(() => {
        wx.hideLoading()
      })
  },
  getDogs: function () {
    wx.showLoading({
      title: '正在赶来🐶'
    })
    const db = wx.cloud.database()
    db.collection('dog')
      .orderBy('id', 'asc')
      .skip(this.data.dogPage)
      .limit(20)
      .get()
      .then(res => {
        const total = this.data.dogPhotos.concat(res.data)
        this.setData({
          dogPhotos: total
        })
        wx.hideLoading()
      })
      .catch(() => {
        wx.hideLoading()
      })
  },
  preview: function (e) {
    const currentUrl = e.currentTarget.dataset.origin
    const type = e.currentTarget.dataset.type
    let arr = []
    if (type === 'cat') {
      arr = this.data.catPhotos.map(v => v.medium)
    } else {
      arr = this.data.dogPhotos.map(v => v.medium)
    }
    wx.previewImage({
      current: currentUrl,
      urls: arr,
      fail: (e) => console.log(e)
    })
  },
  scrollDown: function () {
    if (this.data.activeTab === 'cat') {
      this.setData({
        page: this.data.page + 20
      })
      this.getDatas()
    } else {
      this.setData({
        page: this.data.dogPage + 20
      })
      this.getDogs()
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: 'i宠家-宠物图集',
      path: '/pages/index/index'
    }
  }
})