var appInstance = getApp()
let api = require('../../utils/api.js')
Page({
  data: {
    categories: [],
    banner: [],
    products:[]
  },
  onLoad(){
    //拿到本地储存的数据
    var value = wx.getStorageSync('key')
    let categories
    let products
    if(value.length>0){
      //有数据就直接拿到
      categories = appInstance.globalData.categories
      products = appInstance.globalData.products
    }else{
      //没有数据就从数据库直接获取
      appInstance.getCategoriesData()
    }
    this.setData({
      categories: categories,
      products : products
    })
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