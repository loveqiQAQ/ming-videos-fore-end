// pages/login/login.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 登录
   */
  doLogin(e) {
    let formObject = e.detail.value
    let username = formObject.username
    let password = formObject.password

    // 简单验证
    if (username.length == 0 || password.length == 0) {
      wx.showToast({
        title: '用户名或密码不能为空',
        icon: 'none',
        duration: 3000
      })
    } else {
      let serverUrl = app.serverUrl

      wx.showLoading({
        title: '请稍后...'
      })

      wx.request({
        url: `${serverUrl}/login`,
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

          if (res.data.status == 200) {
            wx.showToast({
              title: '登陆成功',
              icon: 'success',
              duration: 2000
            })

            app.userInfo = res.data.data

            wx.redirectTo({
              url: '../mine/mine'
            })
          } else if(res.data.status == 500) {
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
   * 跳转到注册页面
   */
  goRegistPage() {
    wx.redirectTo({
      url: '../regist/regist'
    })
  }



})