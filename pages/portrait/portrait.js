// pages/portrait/portrait.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: ''
  },
  formSubmit: function (e) {
    var that = this;
    var portrait = e.detail.value.portrait;
    var _uid = wx.getStorageSync('uid');
    var appData = app.globalData;

    console.log(portrait);

    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/User/edit_portrait',
      data: {
        portrait: portrait,
        uid: _uid
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
  },
  choose: function () {
    var that = this;
    var appData = app.globalData;
    var uid = wx.getStorageSync('uid');

    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: appData.ApiUrl + '/index.php/CardApi/User/img_upload',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'type': 'file'
          },
          success: function (res) {
            var data = JSON.parse(res.data);
            //do something
            // console.log(data);
            if (data.status == 1) {
              var _imgSrc = appData.ApiUrl + data.url;
              that.setData({ imgSrc: _imgSrc });
            }
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _userInfo = wx.getStorageSync('user_info');
    this.setData({ imgSrc: _userInfo.portrait });
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