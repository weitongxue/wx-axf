var Mock = require("mockjs")
var fs = require("fs")

var data = Mock.mock({
  "banner|4": [
    {
      "id|+1": 1,
      "bannar_img": "@image(320x120,@color)"
    },
  ],
  //分类信息
  "categories|15": [
    {
      "id|+1": 1,
      "name": "@cword(3,5)",
      "color": "@color",
      "img": "@image(320x76,@color)",
      //小分类
      "cids|4": [
        {
          "name": "@cname(4,6)",
        }
      ],
      // 保存分类对应的商品数据
      'product': []
    }
  ],
  //商品数据
  "products|400-600": [
    {
      "id|+1": 1,
      "name": "@cword(3,5)",
      //商品对应的大分类id
      "categoriesId|1-15": 10,
      //商品对应的小分类id
      "cidsId|0-3": 10,
      //规格
      "store_nums|10-1000.1": 10,
      //价格
      "price|1-99": 10,
      //缩略图
      "img": "@image(94x94,@color)",
      //详情图
      "imgs": "@image(296x296,@color)",
      //商品的数量
      "num": 0,
      //品牌
      "brand": "@cword(2,3)",
      //保质期
      "time|1-24": 10,
      //商品详情
      "content": "@cparagraph()"
    }
  ],
  //用户信息
  "users": [],
  //用户购物车数据
  "carts": [],
  //城市列表
  citys: [
    {
      city: '深圳市',
      site: '腾讯',
      cityX: 113.94108,
      cityY: 22.548633
    },
    {
      city: '广州市',
      site: '广州塔',
      cityX: 113.331084,
      cityY: 23.112223
    },
    {
      city: '武汉市',
      site: '黄鹤楼',
      cityX: 114.309124,
      cityY: 30.55198
    },
  ],
  /* 
  用户的地址信息
  {
    id: 地址在地址表中的id
    用户id，这个地址是哪个用户的
    联系人，
    性别，
    手机号码，
    城市,
    地区，
    详细地址,->百度地图
    坐标数据
  }
*/
  'sites': [],

})

fs.writeFile("db.json", JSON.stringify(data, null, 2), function () {
  console.log("文件写入成功")
})