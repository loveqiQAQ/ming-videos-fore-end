// pages/mine/mine.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    faceUrl: "../resource/images/noneface.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let that = this

    let user = app.userInfo

    wx.showLoading({
      title: '请稍等...'
    })

    let serverUrl = app.serverUrl

    wx.request({
      url: `${serverUrl}/user/query/${user.id}`,
      data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        wx.hideLoading()

        if (res.data.status == 200) {
          let userInfo = res.data.data
          let faceUrl = "../resource/images/noneface.png"
          if (userInfo.faceImage != null &&
            userInfo.faceImage != '' &&
            userInfo.faceImage != undefined) {
            faceUrl = serverUrl + userInfo.faceImage
          }

          that.setData({
            faceUrl: faceUrl,
            fansCounts: userInfo.fansCounts,
            followCounts: userInfo.followCounts,
            receiveLikeCounts: userInfo.receiveLikeCounts,
            nickname: userInfo.nickname
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

  },

  /**
   * 注销接口实现
   */
  logout() {

    let userId = app.userInfo.id
    let serverUrl = app.serverUrl

    wx.showLoading({
      title: '请稍等...'
    })

    wx.request({
      url: `${serverUrl}/logout/${userId}`,
      data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.info(res)
        wx.hideLoading()
        if (res.data.status == 200) {
          wx.showToast({
            title: '注销成功',
            icon: 'success',
            duration: 2000
          })

          app.userInfo = null

          wx.redirectTo({
            url: '../login/login'
          })
        }
      }
    })
  },

  /**
   * 上传头像接口实现
   */
  changeFace() {

    let that = this

    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // success
        let tempFilePaths = res.tempFilePaths
        wx.showLoading({
          title: '请稍等...'
        })
        let serverUrl = app.serverUrl

        wx.uploadFile({
          url: `${serverUrl}/user/uploadFace/${app.userInfo.id}`,
          filePath: tempFilePaths[0],
          name: 'file',
          // header: {}, // 设置请求的 header
          // formData: {}, // HTTP 请求中其他额外的 form data
          success: function (res) {
            wx.hideLoading()
            let data = JSON.parse(res.data)
            if (data.status == 200) {
              wx.showToast({
                title: '上传成功~~',
                icon: 'success'
              })

              let imageUrl = data.data

              that.setData({
                faceUrl: `${serverUrl}${imageUrl}`
              })

            } else if (data.status == 500) {
              wx.showToast({
                title: data.msg
              })
            }


          }
        })

      }
    })
  },

  uploadVideo() {
    let that = this

    wx.chooseVideo({
      sourceType: ['album', 'camera'], // album 从相册选视频，camera 使用相机拍摄
      // maxDuration: 60, // 拍摄视频最长拍摄时间，单位秒。最长支持60秒
      camera: ['front', 'back'],
      success: function(res){
        // success
        let duration = res.duration
        let tempHeight = res.height
        let tempVideoUrl = res.tempFilePath
        let tempCoverUrl = res.thumbTempFilePath
        let tempWidth = res.width

        if (duration > 11) {
          wx.showToast({
            title: '视频长度不能超过10秒...',
            icon: 'none',
            duration: 2500
          })
        } else if (duration < 1) {
          // TODO 打开选择bgm的页面
          wx.showToast({
            title: '视频长度不能少于1秒...',
            icon: 'none',
            duration: 2500
          })
        } else {
          wx.navigateTo({
            url: `../chooseBgm/chooseBgm?duration=${duration}&tempHeight=${tempHeight}&tempWidth=${tempWidth}&tempVideoUrl=${tempVideoUrl}&tempCoverUrl=${tempCoverUrl}`
          })
        }

      }
    })
  }
})