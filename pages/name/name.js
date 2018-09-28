// pages/name/name.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname: ''
  },
  formSubmit: function (e) {
    // console.log(e.detail.value.nickname);
    var uid = wx.getStorageSync('uid');
    var nickname = e.detail.value.nickname;
    var appData = app.globalData;

    if (nickname == '') {
      wx.showToast({
        title: '请输入昵称',
        icon: 'loading',
        duration: 1000
      });
    } else {
      // console.log(uid);
      // console.log(nickname);
      wx.request({
        url: appData.ApiUrl + '/index.php/CardApi/User/edit_nickname',
        data: {
          uid: uid,
          nickname: nickname
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          // console.log(res);
          if (res.data.status == 1) {
            //修改成功
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 1000
            });
            setTimeout(function () {
              wx.switchTab({
                url: '../user/user'
              });
            }, 1000);
          } else {
            wx.showToast({
              title: '修改失败',
              icon: 'loading',
              duration: 1000
            });
          }
        }
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _nickname = wx.getStorageSync('user_info');
    this.setData({ nickname: _nickname.nickname });
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