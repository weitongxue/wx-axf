var appInstance = getApp()
let api = require('../../utils/api.js')
Page({
  data: {
    categories: [],
    banner: [],
    products:[]
  },
  onLoad(){
    //拿到全局变量的数据
    let categories = appInstance.globalData.categories
    let products = appInstance.globalData.products
    if (categories.length>0){
      //有数据就直接拿到
      categories = appInstance.globalData.categories
      products = appInstance.globalData.products
    }else{
      //没有数据就从数据库直接获取
      appInstance.getCategoriesData()
    }
    this.setData({
      categories: categories,
      products : products,
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
  //添加商品
  addCart(event){
    //判断用户是否登录
    let userInfo = appInstance.globalData.userInfo
    if( !userInfo.length > 0){
      wx.showToast({
          title: '未登录，请先登录',
          icon: 'none',
          duration: 2500,
          success: function(res) {
            wx.navigateTo({
              url: '/pages/login/login'
            })
          },
        })
    }else{
      let product = event.currentTarget.dataset.product
      appInstance.addProduct(product)
      .then(()=>{
        this.setData({
          products: appInstance.globalData.products
        })
      })
    }
  }
})