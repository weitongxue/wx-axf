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
    this.setData({
      categories: appInstance.globalData.categories,
      products: appInstance.globalData.products,
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
  //拿到分类对应的商品
    getActiveProduct(){
      let activeIndex = this.data.activeIndex
      let activeCidIndex = this.data.activeCidIndex
      if (activeCidIndex == 'all'){
        let activeProducts = this.data.categories[activeIndex].product
        this.setData({
          activeProducts: activeProducts
        })
      }else{
        let activeProducts = this.data.categories[activeIndex].product.filter(item => item.cidsId == activeCidIndex)
        this.setData({
          activeProducts: activeProducts
        })
      }
      
    },
    //综合排序
    changeSort(event){
      let index  = event.currentTarget.dataset.index
      this.setData({
        activeSortIndex:index,
        Bol:true,
        activeBol: true,
        activeCol: true,
      })
      this.getActiveSortProduct()
    },
    //综合排序对应的商品
    getActiveSortProduct(){
      let activeSortIndex = this.data.activeSortIndex
      if (activeSortIndex  == 1 ){
        let activeProducts = this.data.activeProducts
        var pro = activeProducts.slice(0).sort((a,b)=>{
          return b.price - a.price
        })
      }else if (activeSortIndex == 2){
        let activeProducts = this.data.activeProducts
        var pro = activeProducts.slice(0).sort((a, b) => {
          return a.price - b.price
        })
      } else{
        var pro = this.data.activeProducts
      }
      this.setData({
        activeProducts : pro
      })
    }



})