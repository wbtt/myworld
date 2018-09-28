// pages/person/person.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var uid = wx.getStorageSync('uid');
    var that = this;
    var appData = app.globalData;

    // console.log(uid);

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
          
          var user_info = res.data.data;
          console.log(user_info);
          that.setData({
            userInfo: user_info,
          });
          wx.setStorageSync('user_info', user_info);
        }
      });
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