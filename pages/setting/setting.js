// pages/setting/setting.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  portrait: function () {
    wx.navigateTo({
      url: '../portrait/portrait'
    })
  },
  name: function () {
    wx.navigateTo({
      url: '../name/name'
    })
  },
  mail: function () {
    wx.navigateTo({
      url: '../mail/mail'
    })
  },
  signature: function () {
    wx.navigateTo({
      url: '../signature/signature'
    })
  },
  logout: function() {
    wx.navigateTo({
      url: '../login/login'
    })
  },
  clear: function() {
    wx.clearStorageSync();
  },
  change: function () {
    wx.navigateTo({
      url: '../change/change'
    })
  },
  service: function () {
    wx.navigateTo({
      url: '../service/service'
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var appData = app.globalData;
    var uid = wx.getStorageSync('uid');
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
        //console.log(res.data.data.type);
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