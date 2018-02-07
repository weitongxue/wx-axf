
let api = require('/utils/api.js')
App({
  onLaunch(){
      this.getCategoriesData()
  },

  globalData:{
    categories:[],
    products:[],
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
       wx.setStorage({
         key: 'categories',
         data:res.data
       })
      }
    })
    wx.hideLoading()
  },
  //获取所有商品的数据
  getProductsData() {
    return new Promise((resolve, reject) => {
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
          resolve()
        }
      })
    })
  },
  //重置原始数据（因为在闪送超市页面渲染的是原始数据，里面的num与用户的购物车num不一致，所以需要重置 ）
  saveProduct(product) {
    //拿到原始的商品数据
    let products = this.globalData.products
    for (let i = 0; i < products.length; i++) {
      for (let j = 0; j < product.length; j++) {
        if (products[i].id == product[j].product_id) {
          products[i].num = product[j].num
        }
      }
    }
    this.globalData.products = products
  },
  //添加商品
  addProduct(product){
    return new Promise((resolve, reject) => {
      //拿到该用户的购物车信息
      let cartInfo = this.globalData.cartInfo
      let userInfo = this.globalData.userInfo
      let userId = userInfo[0].id
      //表示商品在购物车中不存在
      let bol = true
      for (let i = 0; i < cartInfo.length; i++) {
        if (product.id == cartInfo[i].product_id) {
          //找到了该商品，假设不成立
          bol = false
          let id = cartInfo[i].id
          //商品的数量加加
          cartInfo[i].num++
          let num = cartInfo[i].num
          //同步更新数据库里的商品数量
          wx.request({
            url: api.host + "/carts/" + id,
            data: {
              num: num
            },
            method: "PATCH",
            success: (res) => {
              wx.showToast({
                title: '更新数量成功',
                icon: 'success',
                duration: 2000
              })
              //重置数据
              this.saveProduct(res.data)
              resolve()
            },
          })
        }
      }
      if (bol) {
        //商品在购物车中不存在，执行添加的操作
        let productObj = {
          //用户id 
          userId: userId,
          //商品的id
          product_id: product.id,
          //商品名称
          product_name: product.name,
          //商品价格
          product_price: product.price,
          //商品数量
          num: 1,
          //商品图片
          product_img: product.img,
          //商品规格
          product_store: product.store_nums
        }
        cartInfo.push(productObj)
        //同步添加到数据库
       wx.request({
          url: api.host + "/carts",
          data: productObj,
          header: {
            'content-type': 'application/json' // 默认值
          },
          method: "POST",
          success: (res) => {
           wx.showToast({
              title: '添加商品成功',
              icon: 'success',
              duration: 2000,
            })
            //重置数据
            this.saveProduct(res.data)
            resolve()
          },
        })
      }
      //更新全局变量cartInfo
      this.globalData.cartInfo = cartInfo
    })
  },
  
})