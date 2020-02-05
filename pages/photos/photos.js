// pages/photos/photos.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    page: 0,
    photos: [],
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
  },
  getDatas: function () {
    wx.showLoading({
      title: '正在赶来🐱‍🏍'
    })
    const db = wx.cloud.database()
    db.collection('animal')
      .orderBy('id', 'asc')
      .skip(this.data.page)
      .limit(20)
      .get()
      .then(res => {
        const total = this.data.photos.concat(res.data)
        this.setData({
          photos: total
        })
        wx.hideLoading()
      })
      .catch(() => {
        wx.hideLoading()
      })
  },
  scrollDown: function () {
    this.setData({
      page: this.data.page + 20
    })
    this.getDatas()
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

  }
})