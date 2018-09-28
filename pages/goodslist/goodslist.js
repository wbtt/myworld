// pages/goodslist/goodslist.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.ApiUrl,
    order_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    var that = this;
    var appData = app.globalData;
    var id = options.id;
    var uid = wx.getStorageSync('uid');
    //设置当前页面的标题
    wx.setNavigationBarTitle({
      title: options.name
    })
    
    // 动态加载数据
    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/Mall/order_list',
      data: {
        id: id
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // console.log(res);
        if (res.data.status == 1) {
          that.setData({ order_list: res.data.goods });
        }
      }
    });
  },
  goodsdetail: function (e) {
    var id = e.currentTarget.dataset.id;
    // console.log(id);
    wx.navigateTo({
      url: '../goodsdetail/goodsdetail?id=' + id
    })
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

  }
})