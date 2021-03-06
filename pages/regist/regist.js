const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 注册
   */
  doRegist(e) {
    let formObject = e.detail.value
    let username = formObject.username
    let password = formObject.password

    // 简单验证
    if (username.length == 0 || password.length == 0) {
      wx.showToast({
        title: '用户名或密码不能为空哟~',
        icon: 'none',
        duration: 3000
      })
    } else {
      let serverUrl = app.serverUrl

      wx.showLoading({
        title: '请稍后...'
      })

      wx.request({
        url: `${serverUrl}/regist`,
        data: {
          username: username,
          password: password
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success(res){
          // success
console.info(res)
          wx.hideLoading()

          let status = res.data.status
          if (status == 200) {
            wx.showToast({
              title: '注册成功!',
              icon: 'none',
              duration: 3000
            })

            app.userInfo = res.data.data
          }else if(status == 500) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 3000
            })
          }
        }
      })
    }
  },

  /**
   * 跳转到登录页面
   */
  goLoginPage() {
    wx.navigateTo({
      url: '../login/login'
    })
  }

  
})