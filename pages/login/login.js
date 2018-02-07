let api = require('../../utils/api.js')
let appInstance = getApp()
Page({
  data: {
    //判断是否聚焦
      focusBol:false,
      //输入框的内容
      phoneInfo:''
  },
  onLoad: function (options) {

  },
  //聚焦事件
    focusInfo(){
      this.setData({
        focusBol:true
      })
    },
  //失焦事件
  blurInfo(){
    setTimeout(()=>{
      this.setData({
        focusBol: false
      })
    },500) 
  },
  //input事件
  changePhone(event){
    let phone = event.detail.value
    this.setData({
      phoneInfo : phone
    })
  },
  //确定按钮
  subInfo(){
    let reg = /^1[35678]\d{9}$/g
    let phone = this.data.phoneInfo
    if(!phone.length > 0){
      wx.showToast({
        title: '内容不能为空',
        icon:"none"
      })
    }else{
      if (reg.test(phone)) {
        //满足条件,判断用户是应该登录还是注册
        wx.request({
          //获取数据库里的用户信息来匹配(参数为电话号码)
          url: api.host + '/users?phone=' + phone,
          success: function (res) {
              //如果有，就是登录，没有就是注册
              if(res.data.length>0){
                wx.showToast({
                  title: '登录成功',
                  icon: "success",
                  duration: 2000
                })
                //拿到当前用户的信息并添加到全局变量（包括地址信息和购物车信息）
                appInstance.globalData.userInfo = res.data
                let id = res.data[0].id
                //获取购物车信息
                  wx:wx.request({
                    url: api.host + '/carts?userId=' + id,
                    success: (res) =>{
                      //添加到全局变量中
                      appInstance.globalData.cartInfo = res.data
                      //重置原始数据
                      appInstance.saveProduct(res.data)
                    }
                  }) 
              }else{
                //注册
                let userObj = {
                  phone:phone,
                  selectSite:[]
                }
                //保存到数据库里
                wx.request({
                  url: api.host + '/users',
                  method	:"post",
                  data:userObj,
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  success: function (res) {
                    wx.showToast({
                      title: '欢迎成为蜂蜜',
                      icon: "success",
                      duration: 2000
                    })
                    //添加到全局变量中
                    appInstance.globalData.userInfo.push(res.data)
                  }
                })
                //保存到本地
                wx.setStorage({
                  key: "user",
                  data:userObj
                }
                )
              }
          }
        })
        wx.switchTab({
          url: '/pages/index/index'
        })
      }else{
        wx.showToast({
          title: '手机号输入格式错误',
          icon: "none",
          duration: 2000
        })
      }
    }
  }

})