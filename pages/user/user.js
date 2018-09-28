// pages/user/user.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    all: 0,
    stock: ''
  },
  cart: function () {
    wx.navigateTo({
      url: '../cart/cart',
    })
  },
  myOrder: function () {
    wx.navigateTo({
      url: '../myorder/myorder',
    })
  },
  assets: function () {
    wx.navigateTo({
      url: '../assets/assets',
    })
  },
  personal: function () {
    wx.navigateTo({
      url: '../person/person',
    })
  },
  setting: function () {
    wx.navigateTo({
      url: '../setting/setting'
    })
  },
  authen: function () {
    var that = this;
    var appData = app.globalData;
    var uid = wx.getStorageSync('uid');
    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/User/get_id_auth',
      data: {
        uid: uid
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //console.log(res);
        var is_auth = res.data.data.is_auth;
        if (is_auth == 1) {
          wx.showToast({
            title: '已提交审核，请耐心等待',
            icon: 'loading',
            duration: 1000
          });
        } else if (is_auth == 2) {
          wx.showToast({
            title: '已通过审核',
            icon: 'success',
            duration: 1000
          });
        } else {
          wx.navigateTo({
            url: '../authen/authen'
          })
        }
      }
    });
  },
  bankcard: function () {
    wx.navigateTo({
      url: '../bankcard/bankcard'
    })
  },
  mystock: function () {
    var that = this;
    var appData = app.globalData;
    var uid = wx.getStorageSync('uid');
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

  },
  transaction: function () {
    wx.navigateTo({
      url: '../transaction/transaction'
    })
  },
  getticket: function () {
    wx.navigateTo({
      url: '../ticket/ticket'
    })
  },
  sharecode: function () {
    var that = this;
    var appData = app.globalData;
    var uid = wx.getStorageSync('uid');
    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/User/get_share_code',
      data: {
        uid: uid
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.status == 1) {
          wx.navigateTo({
            url: '../code/code'
          })
        }else{
          wx.showToast({
            title: '您没有获得分享码,请前去领票',
            icon: 'loading',
            duration: 1000
          });
          setTimeout(function () {
            wx.hideLoading(),
              wx.navigateTo({
                url: '../ticket/ticket'
              })
          }, 1000)
        }
      }
    });
  },
  mycart: function () {
    wx.navigateTo({
      url: '../history/history'
    })
  },
  sign: function () {
    var that = this;
    var appData = app.globalData;
    var uid = wx.getStorageSync('uid');
    var _userInfo = that.data.userInfo;

    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/User/user_sign',
      data: {
        uid: uid
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //console.log(res);
        if (res.data.status == 1) {
          wx.showToast({
            title: '积分+' + res.data.score,
            icon: 'success',
            duration: 1000
          });
          _userInfo.is_sign = 1;
          that.setData({
            userInfo: _userInfo,
          });
        } else {
          wx.showToast({
            title: '签到失败',
            icon: 'loading',
            duration: 1000
          });
        }
      }
    });
  },
  recharge: function () {
    // wx.showToast({
    //   title: '暂未开放',
    //   icon: 'loading',
    //   duration: 1000
    // });
    wx.navigateTo({
      url: '../recharge/recharge'
    });
  },
  withdrawal: function () {
    wx.navigateTo({
      url: '../withdrawal/withdrawal'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var uid = wx.getStorageSync('uid');
    var that = this;
    var appData = app.globalData;

    // console.log(uid);
    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/User/get_stock_sty',
      data: {
        uid: uid
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // console.log(res.data.data);
        var datas = parseInt(res.data.data);
        that.setData({
          stock: datas
        });
      }
    });
    if (uid =='') {
     
      wx.navigateTo({
        url: '../login/login'
      });
    } else {
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
          wx.setStorageSync('user_info', user_info);
        }
      });
    }
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
})