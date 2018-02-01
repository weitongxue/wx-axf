
let api = require('/utils/api.js')
App({
  onLaunch(){
   this.getCategoriesData()
  },
  globalData:{
    categories: [],
    products: [],
  },

  //获取分类数据
  getCategoriesData(){
    wx.request({
      url: api.host + '/categories',
      success: res => {
       this.globalData.categories = res.data
       this.getProductsData()
      }
    })
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
})