// pages/assets/assets.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    total: 0,
    frozen: 0,
    assets: 0,
    array: []
  },
  recharge: function () {
    wx.navigateTo({
      url: '../recharge/recharge'
    });
  },
  widthdrawal:function(){
    wx.navigateTo({
      url: '../withdrawal/withdrawal'
    });
  },
  faq: function () {
    wx.navigateTo({
      url: '../faq/faq'
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _userInfo = wx.getStorageSync('user_info');
    var _total = parseFloat(_userInfo.assets) + parseFloat(_userInfo.frozen);
    var totla = parseFloat(_total).toFixed(4);
    this.setData({ total: totla, frozen: _userInfo.frozen, assets: _userInfo.assets });
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
          wx.setStorageSync('user_info', user_info);
        }
      });
    } else {
      wx.navigateTo({
        url: '../login/login'
      });
    }
    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/User/get_amount_log',
      data: {
        uid: uid
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data.data);
        var datas = res.data.data;
        if (datas.length > 0) {
          that.setData({
            array: datas,
          });
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