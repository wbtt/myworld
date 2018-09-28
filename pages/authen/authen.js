// pages/authen/authen.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  formSubmit: function (e) {
    var that = this;
    var phone = e.detail.value.phone;
    var password = e.detail.value.password;
    var _uid = wx.getStorageSync('uid');
    var appData = app.globalData;
    if (phone == '') {
      wx.showToast({
        title: '请输入姓名',
        icon: 'loading',
        duration: 1000
      });
      return false;
    }
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/.test(password))) {
      wx.showToast({
        title: '身份证号不正确',
        icon: 'loading',
        duration: 1000
      });
      return false;
    }
    if (password == '') {
      wx.showToast({
        title: '请输入身份证号',
        icon: 'loading',
        duration: 1000
      });
      return false;
    }
    // console.log(password);

    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/User/getIDcard',
      data: {
        realname: phone,
        idcard: password,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //console.log(res);
        if (res.data.data.status == 1) {
          wx.request({
            url: appData.ApiUrl + '/index.php/CardApi/User/put_user',
            data: {
              idcard: password,
              realname: phone,
              uid: _uid
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res);
              if (res.data.status == -1) {
                wx.showToast({
                  title: '该身份证号已被认证',
                  icon: 'loading',
                  duration: 1000
                });
              } else {
                wx.showToast({
                  title: '认证成功',
                  icon: 'success',
                  duration: 1000
                });
                setTimeout(function () {
                  wx.switchTab({
                    url: '../user/user'
                  })
                }, 1000)
              }
            }
          });
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'loading',
            duration: 2000
          });
        }
      }
    });
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

  }
})