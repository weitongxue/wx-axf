
let api = require('/utils/api.js')
App({
  onLaunch(){
      this.getCategoriesData()
  },

  globalData:{
    categories: [],
    products: [],
    //当前用户的信息
    userInfo:[],
    //当前用户的购物车信息
    cartInfo:[]
  },

  //获取分类数据
  getCategoriesData(){
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: api.host + '/categories',
      success: res => {
       this.globalData.categories = res.data
       this.getProductsData()
       //存储到本地(异步接口)
       wx.setStorageSync(
         'categories',
          res.data
       )
      }
    })
    wx.hideLoading()
  },
  //获取所有商品的数据
  getProductsData() {
    wx.request({
      url: api.host + '/products',
      success: res => {
        this.globalData.products = res.data
        for (var i = 0; i < this.globalData.categories.length; i++) {
          for (var j = 0; j < this.globalData.products.length; j++) {
            if (this.globalData.categories[i].id == this.globalData.products[j].categoriesId) {
              this.globalData.categories[i].product.push(this.globalData.products[j])
            }
          }
        }
      }
    })
  },
  //添加商品
  add(product){
    //拿到该用户的购物车信息
    let cartInfo = this.globalData.cartInfo
    //表示商品在购物车中不存在
    let bol = true
    for(let i = 0 ; i < cartInfo.length ; i++){
        if(product.id ==  cartInfo[i].product_id){
          //找到了该商品，假设不成立
          bol = false
          //商品的数量加加
          cartInfo[i].num++
          
         
        }
    }
  }
})