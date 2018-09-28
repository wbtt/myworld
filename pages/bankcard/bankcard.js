// pages/bankcard/bankcard.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    num: 0
  },
  join: function (e) {
    var _num = e.target.dataset.id;
    var uid = wx.getStorageSync('uid');
    var that = this;
    var appData = app.globalData;
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
        if (res.data.data.is_auth == 2) {
          if (_num == 3) {
            wx.showToast({
              title: '银行卡只能填写3张',
              icon: 'loading',
              duration: 1000
            });
          } else {
            wx.navigateTo({
              url: '../join/join'
            });
          }
        } else {
          wx.showToast({
            title: '身份验证成功后才能添加',
            icon: 'loading',
            duration: 1000
          });
          setTimeout(function () {
              wx.navigateTo({
                url: '../authen/authen'
              });
          }, 1000)
        }
      }
    });
    //console.log(_num);

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options);
    var that = this;
    var appData = app.globalData;
    var uid = wx.getStorageSync('uid');
    //console.log(uid);
    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/User/get_bank_list',
      data: {
        uid: uid
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        if (res.data.status == 1) {
          that.setData({ array: res.data.data });
          that.setData({ num: res.data.num });
        } else {
          //暂无列表数据
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