// pages/mystock/mystock.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: []
  },
  sell: function(e){
    // console.log(e);
    var id = e.currentTarget.dataset.id;
    console.log(id);

    wx.navigateTo({
      url: '../sell/sell?id=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var appData = app.globalData;
    var uid = wx.getStorageSync('uid');
    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/User/get_stock_save',
      data: {
        uid: uid
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      }
    });
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
       // console.log(res);
        var datas = res.data.data;
        if (datas.length > 0) {
          that.setData({
            array: datas
          });
        }
      }
    });
    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/User/my_stock_time',
      data: {
        uid: uid
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        if (res.data.status==-1){
          that.setData({
            time: res.data.data,
            disabled: true
          });
        }else{
          that.setData({
            disabled: false
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