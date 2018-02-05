let appInstance = getApp()
Page({
  data: {
    categories: [],
    products: [],
    //控制蒙版显示隐藏
    Bol: true,
    //判断分类按钮的状态
    activeBol: true,
    activeCol: true,
    arr: ["综合排序", "价格最高", "价格最低"],
    //激活的大分类下标
    activeIndex: 0,
    //激活的商品
    activeProducts: [],
    //激活的小分类
    activeCids : '全部分类',
    //综合排序激活的小分类
    activeSortIndex:0,
    //激活的小分类的下标
    activeCidIndex : 'all'
  },
  onLoad: function () {
    //拿到本地数据
    var value = wx.getStorageSync('key')
    let categories
    let products
    if (value.length > 0) {
      //有数据就直接拿到
      categories = appInstance.globalData.categories
      products = appInstance.globalData.products
    } else {
      //没有数据就从数据库直接获取
      appInstance.getCategoriesData()
    }
    this.setData({
      categories: categories,
      products:products
    })
    this.getActiveProduct()
  },
  //控制小分类的显示隐藏
  changeHidden(){
    let activeBol = this.data.activeBol
    activeBol = !activeBol
    this.setData({
      activeBol: activeBol,
      activeCol: true,
      Bol: activeBol
    })
  },
  changeBlock(){
    let activeCol = this.data.activeCol
    activeCol = !activeCol
    this.setData({
      activeBol: true,
      activeCol: activeCol,
      Bol: activeCol
    })
  },
  //切换大分类
  changeActiveIndex(event){
    let index = event.currentTarget.dataset.index
    this.setData({
      activeIndex:index,
      activeBol : true,
      activeCol: true,
      activeCids: '全部分类',
      activeSortIndex:0
    })
    this.getActiveProduct()
  },
  //切换激活的小分类
  changeCids(event){
    let activeCids = event.currentTarget.dataset.name
    let activeCidIndex = event.currentTarget.dataset.index
    this.setData({
      activeCids: activeCids,
      activeCidIndex: activeCidIndex,
      Bol: true,
      activeBol: true,
      activeCol: true,
      activeSortIndex:0
    })
    this.getActiveProduct()
  },
  //综合排序
  changeSort(event) {
    let index = event.currentTarget.dataset.index
    this.setData({
      activeSortIndex: index,
      Bol: true,
      activeBol: true,
      activeCol: true,
    })
    this.getActiveProduct()
  },

  //拿到分类对应的商品
    getActiveProduct(){
      let activeIndex = this.data.activeIndex
      let activeCidIndex = this.data.activeCidIndex
      let activeSortIndex = this.data.activeSortIndex
      let activeProducts = this.data.categories[activeIndex].product
      if (activeCidIndex == 'all'){
        activeProducts = activeProducts
      }else{
        activeProducts = activeProducts.filter(item => item.cidsId == activeCidIndex)
      }
      if (activeSortIndex == 1) {
        activeProducts = activeProducts.slice(0).sort((a, b) => {
          return b.price - a.price
        })
      } else if (activeSortIndex == 2) {
        activeProducts = activeProducts.slice(0).sort((a, b) => {
          return a.price - b.price
        })
      } else {
        activeProducts = activeProducts
      }
      
      this.setData({
        activeProducts: activeProducts
      })
    },
  
})