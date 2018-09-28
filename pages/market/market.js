// pages/market/market.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.ApiUrl,
    // 分类切换
    tabArr: {
      curHdIndex: 1,
      curBdIndex: 1
    },
    // 交易规则
    flag1: true,
    flag2: true,
    //数据
    array: [],
    brray: [],
    ay: [],
    cid: '',
    contrast: '',
    order_list: [],
    imgUrls: [],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    xiangqing_list: ''
  },
  goodsdetail: function (e) {
    var id = e.currentTarget.dataset.id;
     console.log(id);
    wx.navigateTo({
      url: '../goodsdetail/goodsdetail?id=' + id
    })
  },
  more: function (e) {
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../goodslist/goodslist?id=' + id + '&name=' + name,
    });
  },
  a1: function () {
    this.setData({ flag1: false })
  },
  b1: function () {
    this.setData({ flag1: true })
  },
  a2: function () {
    this.setData({ flag2: false })
  },
  b2: function () {
    this.setData({ flag2: true })
  },
  mobileInputEvent: function (e) {
    this.setData({
      sear: e.detail.value
    })
  },
  search: function (e) {
    var that = this;
    var appData = app.globalData;
    var sear = that.data.sear;
    var pid = e.currentTarget.dataset.id;
    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/Product/search_product',
      data: {
        cid: pid,
        search: sear
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        if (res.data.status == 1) {
          var arr = [];
          var brr = [];
          if (res.data.data.length > 0) {
            for (var i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].cid == 1) {
                arr.push(res.data.data[i]);
                that.setData({ array: arr });
              }
              if (res.data.data[i].cid == 2) {
                brr.push(res.data.data[i]);
                that.setData({ brray: brr });
              }
            }
          } else {
            wx.showToast({
              title: '暂无此产品',
              icon: 'loading',
              duration: 1000
            });
          }
        }
      }
    })
  },
  // 搜索
  bindInput: function (e) {
    var sear = e.detail.value;
    var pid = e.currentTarget.dataset.id;
    var that = this;
    var appData = app.globalData;
    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/Product/search_product',
      data: {
        cid: pid,
        search: sear
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        if (res.data.status == 1) {
          var arr = [];
          var brr = [];
          if (res.data.data.length > 0) {
            for (var i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].cid == 1) {
                arr.push(res.data.data[i]);
                that.setData({ array: arr });
              }
              if (res.data.data[i].cid == 2) {
                brr.push(res.data.data[i]);
                that.setData({ brray: brr });
              }
            }
          } else {
            wx.showToast({
              title: '暂无此产品',
              icon: 'loading',
              duration: 1000
            });
          }
        }
      }
    })
  },
  viewDetail: function (e) {
    //console.log(e);
    // console.log(e);
    var id = e.currentTarget.dataset.id;
    //console.log(id);
    wx.navigateTo({
      url: '../markdetail/markdetail?id=' + id
    })
  },
  tabFun: function (e) {
    //获取触发事件组件的dataset属性 
    var _datasetId = e.target.dataset.id;
    //console.log("----" + _datasetId + "----");
    var _obj = {};
    _obj.curHdIndex = _datasetId;
    _obj.curBdIndex = _datasetId;
    this.setData({
      tabArr: _obj
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //   onLoad: function (options) {
  //     var that = this;
  //     var appData = app.globalData;
  //     var uid = wx.getStorageSync('uid');
  //     // 动态加载数据
  //     wx.request({
  //       url: appData.ApiUrl + '/index.php/CardApi/Product/get_product_list',
  //       data: {
  //         uid: uid
  //       },
  //       method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
  //       header: {
  //         'content-type': 'application/x-www-form-urlencoded'
  //       },
  //       success: function (res) {
  //        // console.log(res.data);
  //         if (res.data.status == 1) {
  //           var arr = [];
  //           var brr = [];
  //           for (var i = 0; i < res.data.data.length; i++) {
  //             //that.setData({ contrast: res.data.data[i].retain });
  //             //console.log(res.data.data[i].retain);
  //             if (res.data.data[i].cid == 1) {
  //               arr.push(res.data.data[i]);
  //               that.setData({ array: arr });
  //               that.setData({ cid: res.data.data[i].cid });
  //               //that.setData({ contrast: res.data.data[i].retain });
  //               //console.log(res.data.data[0].retain);
  //               //console.log(that.data.cid);
  //             }
  //             if (res.data.data[i].cid == 2) {
  //               brr.push(res.data.data[i]);
  //               that.setData({ brray: brr });
  //               that.setData({ cid: res.data.data[i].cid });
  //               //console.log(res.data.data[i].cid);
  //               //that.setData({ contrast: res.data.data[i].retain });
  //             }
  //           }
  //         }
  //       }
  //     });


  // // 动态加载分类
  //     wx.request({
  //       url: appData.ApiUrl + '/index.php/CardApi/Product/get_category',
  //       method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
  //       header: {
  //         'content-type': 'application/x-www-form-urlencoded'
  //       },
  //       success: function (res) {
  //         //console.log(res);
  //         if (res.data.status == 1) {
  //           that.setData({ ay: res.data.data });
  //         }
  //       }
  //     });
  //   },


  /**
   * 
   * 新生命周期函数--监听页面加载
   * 
   */




  onLoad: function (options) {
    var that = this;
    var appData = app.globalData;
    var uid = wx.getStorageSync('uid');
    // 动态加载数据
    // wx.request({
    //   url: appData.ApiUrl + '/index.php/CardApi/Mall/order_list',

    //   method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   success: function (res) {

    //     console.log(res.data.status);



    //     if (res.data.status == 1) {

    //       var aa = [];

    //       for (var i = 0; i < res.data.length; i++) {

    //         aa.push(res.data.goods[i]);

    //         that.setData({ order_list: aa });

    //       }

    //       //console.log('5416546465');


    //     }

    //   }

    // });
    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/Mall/indexGoods',
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        if (res.data.status == 1) {
          that.setData({ goodsList: res.data.data });
        }
      }
    });

    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/Index/get_carousel_liset?page=market',
      method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //  console.log(res);
        if (res.data.status == 1) {
          that.setData({ imgUrls: res.data.data });
        } else {
          //暂无列表数据
        }
      }
    });

  },

  /**
     * 商城列表   点击事件  详情页
     * 
     */


  Detail: function (e) {


    var id = e.currentTarget.dataset.id


    var appData = app.globalData;


    //console.log(id);

    wx.request({

      url: appData.ApiUrl + '/index.php/CardApi/Mall/details',

      data: {
        id: id
      },

      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {

        console.log(res.data.find);

        if (res.data.status == 1) {

          that.setData({ xiangqing_list: res.data.find });

        }




      }

    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad();
    wx.stopPullDownRefresh();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onLoad();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})