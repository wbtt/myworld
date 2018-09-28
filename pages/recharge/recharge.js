// pages/recharge/recharge.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: 'USA', value: '../../assets/img/wx.png', checked: 'true' }
    ]
  },
  formSubmit: function (e) {
    var that = this;
    var fmData = e.detail.value;
    var appData = app.globalData;
    var _uid = wx.getStorageSync('uid');
    // console.log(fmData);

    if (fmData.withdrawal =='' || parseFloat(fmData.withdrawal) <= 0) {
      wx.showToast({
        title: '请输入正确的金额',
        icon: 'loading',
        duration: 1000
      });
      return false;
    }

    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/User/balance',
      data: {
        uid: _uid,
        bpprice: fmData.withdrawal
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        // console.log(res);
        if (res.data.status == 1) {
          //下单成功
          var orderno = res.data.data.bpno;
          var money = res.data.data.bpprice;
          wx.showToast({
            title: '下单成功',
            icon: 'success',
            duration: 1000
          });
          setTimeout(function () {
            wx.navigateTo({
              url: '../pay/pay?orderno=' + orderno + '&money=' + money
            });
          }, 1000);
        } else {
          wx.showToast({
            title: '下单失败',
            icon: 'loading',
            duration: 1000
          });
        }
      }
    });

  },
  rectop: function () {
    // wx.navigateTo({
    //   url: '../rectop/rectop'
    // })
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