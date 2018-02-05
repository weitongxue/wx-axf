//天数列表
let dayList = ['今天', '明天', '后天']
let appInstance = getApp()
//时间数组
let time = []
Page({
  data: {
    multiArray: [],
    multiIndex: [0, 0],
    //控制蒙版的显示隐藏
    Bol:true,
    //该用户的购物车数据
    cart:[]
  },
  onLoad(){
      //获取当前的时间
      let hour = new Date().getHours()
      //用于判断时候可以选择30分钟内收货(默认为可以)
      let hourBol = true
      //判断当前时间时候是开业时间，最早为九点开始
      if(hour < 9){
        hour = 8
      }else if(hour > 23){
        //超过23点为明天早上九点送货
        hour = 8
        let hourBol = false
        dayList= ['明天','后天']
      }
      //生成每天对应的时间表
      for (let i = 0; i < dayList.length; i++) {
          let start = 8   //开始时间
          let timeList = []
          if(i === 0){
            //表示今天,时间应该从当前时间算
            start = hour
          }
          if (i === 0 && dayList[i] === '今天' && hourBol) {
            timeList.push('30分钟送达')
          }
          //需要生成多少段时间
          let len = 23 - start
          for(let j = 1 ; j < len ; j++){
              let time = `${start+j}:00-${start+j+1}:00`
              timeList.push(time)
          }
          time.push(timeList)
      }
      let multiArray = [dayList,time[0]]
      this.setData({
        multiArray: multiArray
      })
  },
  onShow (){
    let userInfo = appInstance.globalData.userInfo
    if (!userInfo.length> 0) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    } else {
      let bol
      let cart = appInstance.globalData.cartInfo
      if (this.data.cart.length > 0) {
           bol = false
      }else{
            bol  = true
      }
      this.setData({
        cart : cart ,
        Bol :bol
      })
    }
  },

  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    //根据选择修改pricke值
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (e.detail.value) {
          case 0:
            data.multiArray[1] = time[0];
            break;
          case 1:
            data.multiArray[1] = time[1]
            break;
          case 2:
            data.multiArray[1] = time[2]
            break;
        }
        data.multiIndex[1] = 0;
        break;
    }
    this.setData(data);
  },
  toHome(){
    wx.switchTab({
      url: '/pages/index/index'
    })
  }
})