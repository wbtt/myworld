// pages/markdetail/markdetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: '',
    obj: '',
    id:''
  },
  sell: function (e) {
    var uid = wx.getStorageSync('uid');
    var id = e.currentTarget.dataset.id;
    if(uid == ''){
      wx.navigateTo({
        url: '../login/login'
      });
    }else{
      wx.navigateTo({
        url: '../sell/sell?id=' + id,
      })
    }
  },
  buy: function (e) {
    var uid = wx.getStorageSync('uid');
    var id = e.currentTarget.dataset.id;
    if (uid == '') {
      wx.navigateTo({
        url: '../login/login'
      });
    } else {
      wx.navigateTo({
        url: '../buy/buy?id=' + id,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id);
    var id = options.id;
    var that = this;
    that.setData({id:id});
    var appData = app.globalData;
    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/Product/get_product_info',
      data: {
        product_id: id
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //console.log(res);;
        that.setData({ info: res.data.info, obj: res.data.list[0] });
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
  onShow: function (options) {
    
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