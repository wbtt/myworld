// pages/orderdetail/orderdetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: false,
    loading: false,
    abled: false,
    load: false,
    order: ''
  },
  // 余额支付
  pay: function(){
    var that = this;
    var _data = this.data;
    var _orderno = _data.order.orderno;
    var appData = app.globalData;
    
    that.setData({ disabled: true, loading: true });

    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/Mall/pay_piao',
      data: {
        orderno: _orderno
      },
      method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        if (res.data.status == 1) {
          wx.showToast({
            title: '支付成功',
          });
          setTimeout(function(){
            wx.switchTab({
              url: '../user/user'
            });
          }, 1000);
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'loading',
            duration: 2000
          });
          setTimeout(function () {
            wx.navigateTo({
              url: '../recharge/recharge',
            })
          }, 1000);
        }
      }
    });
  },
  // 微信直接支付
  wxpay:function(){
    var that = this;
    var _data = this.data;
    var _orderno = _data.order.orderno;
    var _money = _data.order.money;
    var appData = app.globalData;
    var _uid = wx.getStorageSync('uid');
    that.setData({ abled: true, load: true });
    wx.showToast({
      title: '下单成功',
      icon: 'success',
      duration: 1000
    });
    setTimeout(function () {
      wx.redirectTo({
        url: '../paystock/paystock?orderno=' + _orderno + '&money=' + _money
      });
    }, 1000);
    // wx.request({
    //   url: appData.ApiUrl + '/index.php/CardApi/User/balance',
    //   data: {
    //     uid: _uid,
    //     bpprice: _money
    //   },
    //   method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   success: function (res) {
    //     console.log(res);
    //     // console.log(res);
    //     if (res.data.status == 1) {
    //       //下单成功
    //       var orderno = res.data.data.bpno;
    //       var money = res.data.data.bpprice;

    //     } else {
    //       wx.showToast({
    //         title: '下单失败',
    //         icon: 'loading',
    //         duration: 1000
    //       });
    //     }
    //   }
    // });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var appData = app.globalData;
    var _oid = options.oid;
    var _uid = wx.getStorageSync('uid');
    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/Mall/getTicketsById',
      data: {
        oid: _oid,
        uid:_uid
      },
      method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
         console.log(res);
        if (res.data.status == 1) {
          that.setData({ order: res.data.data });
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