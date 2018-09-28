// pages/recdown/recdown.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money:'',
    all:0,
    assets:0
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
    //console.log(options.assets);
    var that = this;
    var _money = options.money;
    var _assets = options.assets;
    var _userInfo = wx.getStorageSync('user_info');
    that.setData({ assets: _assets });
    that.setData({ money: options.money });
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