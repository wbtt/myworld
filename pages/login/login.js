// pages/login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  forget:function(){
    wx.navigateTo({
      url: '../forget/forget',
    })
  },
  formSubmit: function (e) {
    // console.log(e.detail.value);
    var that = this;
    var fmData = e.detail.value;
    var appData = app.globalData;
    var postData = {
      phone: fmData.phone,
      password: fmData.password,
    };

    if (postData.phone == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'loading',
        duration: 1000
      });
      return false;
    }
    if (postData.password == '') {
      wx.showToast({
        title: '请输入密码',
        icon: 'loading',
        duration: 1000
      });
      return false;
    }

    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/Login/login',
      data: postData,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.status == 1) {
          wx.setStorageSync('uid', res.data.uid);
          //登录成功
          wx.switchTab({
            url: '../index/index'
          });
        } else if (res.data.status == -1) {
          wx.showToast({
            title: '用户名或密码错误',
            icon: 'loading',
            duration: 1000
          });
        } else {
          wx.showToast({
            title: '用户名或密码格式不正确',
            icon: 'loading',
            duration: 1000
          });
        }
      }
    });
  },
  reg: function () {
    wx.navigateTo({
      url: '../reg/reg'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})