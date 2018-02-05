let appInstance= getApp()
Page({
  onShow() {
    let userInfo = appInstance.globalData.userInfo
    console.log(userInfo)
    if (!userInfo.length > 0) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    } else {
      //获取用户的购物车信息
    }
  },
})