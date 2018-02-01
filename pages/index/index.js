var appInstance = getApp()
let api = require('../../utils/api.js')
Page({
  data: {
    categories: [],
    banner: [],
    products:[]
  },
  onLoad(){
    wx.request({
      url: api.host + '/banner',
      success: res => {
        this.setData({
          banner: res.data
        })
      }
    })
   this.setData({
     categories: appInstance.globalData.categories,
     products: appInstance.globalData.products,
   })
  },
})