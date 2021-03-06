// pages/chooseBgm/chooseBgm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgmList: [],
    serverUrl: "",
    videoParams: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    let that = this
    that.setData({
      videoParams: params
    })

    wx.showLoading({
      title: '请稍等...'
    })

    let serverUrl = app.serverUrl

    wx.request({
      url: `${serverUrl}/bgm/list`,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        wx.hideLoading()

        if (res.data.status == 200) {
          let bgmList = res.data.data
          that.setData({
            bgmList: bgmList,
            serverUrl: serverUrl
          })
        }
      }
    })
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