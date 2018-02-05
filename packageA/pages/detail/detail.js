let api = require('../../../utils/api.js')
let appInstance = getApp()
Page({
  data: {
      productInfo:[]
  },
  onLoad: function (options) {
      let id = options.id
      let products = appInstance.globalData.products
      for(let i = 0 ; i <products.length ; i++){
        if(id == products[i].id){
          let productInfo = products[i]
          this.setData({
            productInfo: productInfo
          })
        }
      }
  },

})