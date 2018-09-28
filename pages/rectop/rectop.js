// pages/rectop/rectop.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: 0,
    total:0
  },
  return: function () {
    wx.switchTab({
      url: '../user/user'
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var appData = app.globalData;
    console.log(options);
    var _money = options.money;
    var _all = options.money;
    var _userInfo = wx.getStorageSync('user_info');
    var _uid = wx.getStorageSync('uid');
    that.setData({ money: _money });
    
    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/User/get_yue',
      data: {
        uid: _uid
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        that.setData({ total: res.data.data });
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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  }
})