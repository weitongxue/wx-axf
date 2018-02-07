let appInstance= getApp()
Page({
  onShow() {
    let userInfo = appInstance.globalData.userInfo
    if (!userInfo.length > 0) {
      wx:wx.showToast({
        title: '未登录，请登录',
        icon: 'none',
        duration: 2000,
        success: function(res) {
            wx.navigateTo({
            url: '/pages/login/login'
          })
        },
      })
    } else {
      //获取用户的购物车信息
    }
  },
})