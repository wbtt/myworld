// pages/shipaddress/shipaddress.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    num: 1,
    obj: '',
    address: {}
  },

  formSubmit: function (e) {
    var that = this;
    var fmData = e.detail.value;
    var appData = app.globalData;
    var uid = wx.getStorageSync('uid');
    var address = {};
    var _obj = this.data.obj;
    var _id = this.data.id;
    var _num = this.data.num;
    fmData.uid = uid;

    // console.log(this.data.id);
    // console.log(this.data.num);
    // console.log(fmData);
    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/User/set_shipping_address',
      data: fmData,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
         console.log(res);
        if (res.data.status == 1) {
          wx.showToast({
            title: '保存成功',
          });
          // console.log(_id);
          // console.log(_num);
          // console.log(_obj);

          if (_obj != '') {
            setTimeout(function () {
              wx.redirectTo({
                url: '../order/order?obj=' + _obj
              });
            }, 1000);
          } else {
            setTimeout(function () {
              wx.redirectTo({
                url: '../order/order?id=' + _id + '&num=' + _num
              });
            }, 1000);
          }
        } else if (res.data.status == -2) {
          wx.showToast({
            title: '登陆后才能添加！',
            icon: 'loading',
            duration: 1000
          });
        } else {
          wx.showToast({
            title: '信息不完整或没有改动',
            icon: 'loading',
            duration: 1000
          });
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
    if (typeof (options.obj) != "undefined") {
      var _obj = options.obj;
      that.setData({ obj: _obj });
    } else {
      var _id = options.id
      var _num = options.num;
    }
    var address = {};

    if (uid != undefined || uid != '') {
      wx.request({
        url: appData.ApiUrl + '/index.php/CardApi/User/get_shipping_address',
        data: {
          uid: uid
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          // console.log(res);
          if (res.data.status != -1) {
            that.setData({
              address: res.data.data[0],
            });
          } else {
            address.consignee = '';
            address.phone = '';
            address.region = '';
            address.block = '';
            address.province = '';
            address.city = '';
            address.aid = -1;
            that.setData({
              address: address
            });
          }
        }
      });

      that.setData({ id: _id, num: _num });
    } else {
      wx.navigateTo({
        url: '../login/login'
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