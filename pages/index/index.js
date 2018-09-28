//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    url: app.globalData.ApiUrl,
    // motto: 'Hello World',
    // userInfo: {}
    imgUrls: [],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    goodsList: [],
    all:0.0000,
    uid:''
  },
  account: function () {
    wx.navigateTo({
      url: '../goodsdetail/goodsdetail?id=197' 
    })
  },
  newsmore:function(){
    wx.switchTab({
      url: '../news/news'
    })
  },
  assets: function () {
    wx.navigateTo({
      url: '../assets/assets',
    })
  },
  sharecode: function () {
    wx.navigateTo({
      url: '../code/code'
    })
  },
  stock: function () {
    wx.navigateTo({
      url: '../stock/stock'
    })
  },
  market: function () {
    wx.switchTab({
      url: '../market/market'
    })
  },
  mystock: function () {
    var that = this;
    var appData = app.globalData;
    var uid = wx.getStorageSync('uid');
    if (uid == undefined || uid == '') {
      wx.navigateTo({
        url: '../login/login'
      });
    }else{
      wx.request({
        url: appData.ApiUrl + '/index.php/CardApi/User/my_stock',
        data: {
          uid: uid
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          //console.log(res);
          var datas = res.data.data.length;
          if (datas == 0) {
            wx.showToast({
              title: '暂没有分享劵，请前去领票',
              icon: 'loading',
              duration: 1000
            });
            setTimeout(function () {
              wx.hideLoading(),
                wx.navigateTo({
                  url: '../ticket/ticket'
                })
            }, 1000)
          } else {
            wx.navigateTo({
              url: '../mystock/mystock'
            })
          }
        }
      });
    }
  },
  login: function () {
    wx.navigateTo({
      url: '../login/login'
    })
  },
  reg: function () {
    wx.navigateTo({
      url: '../reg/reg'
    })
  },
  todetail: function (e) {
    // console.log(e);
    var id = e.currentTarget.dataset.id;
    // console.log(id);
    wx.navigateTo({
      url: '../press/press?id=' + id
    })
  },
  goodsdetail: function (e) {
    var id = e.currentTarget.dataset.id;
    // console.log(id);
    wx.navigateTo({
      url: '../goodsdetail/goodsdetail?id=' + id
    })
  },
  // todetail: function (e) {
  //   var id = e.currentTarget.dataset.id;
  //   // console.log(id);
  //   wx.navigateTo({
  //     url: '../markdetail/markdetail?id=' + id
  //   })
  // },
  more: function (e) {
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../goodslist/goodslist?id=' + id + '&name=' + name,
    });
  },
  // user: function () {
  //   wx.switchTab({
  //     url: '../user/user'
  //   })
  // },
  // market: function () {
  //   wx.switchTab({
  //     url: '../market/market'
  //   })
  // },
  // news: function () {
  //   wx.switchTab({
  //     url: '../news/news'
  //   })
  // },
  // setting: function () {
  //   wx.navigateTo({
  //     url: '../setting/setting'
  //   })
  // },
  ticket: function (e) {
    wx.navigateTo({
      url: '../ticket/ticket'
    })
  },
  //事件处理函数
  // bindViewTap: function () {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    this.onLoad();
    wx.stopPullDownRefresh();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad();
  },
  onLoad: function () {
    var uid = wx.getStorageSync('uid');
    var that = this;
    var appData = app.globalData;
    // console.log(uid);
    // if (uid == undefined || uid == '') {
    //   wx.navigateTo({
    //     url: '../login/login'
    //   });
    // }
    // console.log('onLoad');
    // var that = this;
    // //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // });

    // wx.request({
    //   url: appData.ApiUrl + '/index.php/CardApi/Index/get_quotations',
    //   method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   success: function (res) {
    //     //console.log(res);
    //     if (res.data.status == 1) {
    //       that.setData({ array: res.data.data });
    //     } else {
    //       //暂无列表数据
    //     }
    //   }
    // });


    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/Index/get_carousel_liset?page=index',
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


    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/Mall/indexGoods',
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // console.log(res);
        if (res.data.status == 1) {
          that.setData({ goodsList: res.data.data });
        }
      }
    });
    if (uid != undefined || uid != '') {
      wx.request({
        url: appData.ApiUrl + '/index.php/CardApi/User/get_user_info',
        data: {
          uid: uid
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          //console.log(res);
          var user_info = res.data.data;
          var _assets = parseFloat(res.data.data.assets);
          var _frozen = parseFloat(res.data.data.frozen);
          var _all = _frozen + _assets;
          var all = parseFloat(_all).toFixed(4);
          that.setData({
            userInfo: user_info,
          });
          that.setData({
            all: all,
          });
          that.setData({
            uid: user_info.uid,
          });
          wx.setStorageSync('user_info', user_info);
        }
      });
    } else {
      // wx.navigateTo({
      //   url: '../login/login'
      // });
      that.setData({
        all: all,
      });
    }
    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/News/get_news_list',
      data: {
        index: 1
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
          for (var i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].cid == 4) {
              brr.push(res.data.data[i]);
              that.setData({ brray: brr });
            }
          }
        }
      }
    });
    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/News/get_news_list1',
      data: {
        index: 1
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
          for (var i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].cid == 1) {
              arr.push(res.data.data[i]);
              that.setData({ array: arr });
              // console.log(that.data.array);
            }
          }
        }
      }
    });
  }
})
