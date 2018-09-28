// pages/forget/forget.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  mobileInputEvent: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  setVerify: function (e) {//发送验证码
    var that = this;
    var appData = app.globalData
    var phone = this.data.phone;
    //console.log(phone);
    if (this.data.buttonDisable) return false;
    var mobile = this.data.mobile;
    var regMobile = /^1\d{10}$/;
    if (!regMobile.test(phone)) {
      wx.showToast({
        title: '手机号有误！'
      })
      return false;
    }
    var c = 60;
    var intervalId = setInterval(function () {
      c = c - 1;
      that.setData({
        verifyCodeTime: c + 's后重发',
        buttonDisable: true
      })
      if (c == 0) {
        clearInterval(intervalId);
        that.setData({
          verifyCodeTime: '获取验证码',
          buttonDisable: false
        })
      }
    }, 1000)
    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/Login/getSmsCode',
      data: {
        tel: phone
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //console.log(res);
      }
    });
  },
  formSubmit: function (e) {
    console.log(e.detail.value);
    var that = this;
    var fmData = e.detail.value;
    var appData = app.globalData;
    var postData = {
      phone: fmData.phone,
      password: fmData.password,
      email: fmData.email,
      pwd: fmData.repwd,
      verify: fmData.verify
    };

    if (postData.phone == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'loading',
        duration: 1000
      });
      return false;
    }
    if (postData.password == '') {
      wx.showToast({
        title: '请输入密码',
        icon: 'loading',
        duration: 1000
      });
      return false;
    }
    if (fmData.repwd == '') {
      wx.showToast({
        title: '请输入确认密码',
        icon: 'loading',
        duration: 1000
      });
      return false;
    }
    if (fmData.repwd != postData.password) {
      wx.showToast({
        title: '确认密码和密码不一致',
        icon: 'loading',
        duration: 1000
      });
      return false;
    }


    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/Login/pwd_recovery',
      data: postData,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        if (res.data.status == 1) {
          //注册成功
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
        } else if (res.data.status == -4) {
          wx.showToast({
            title: '旧密码与新密码一致',
            icon: 'loading',
            duration: 1000
          });
        } else if (res.data.status == -3) {
          wx.showToast({
            title: '验证码有误',
            icon: 'loading',
            duration: 1000
          });
        }else {
          wx.showToast({
            title: '修改失败',
            icon: 'loading',
            duration: 1000
          });
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tel = wx.getStorageSync('tel');
    var email = wx.getStorageSync('email');
    this.setData({
      verifyCodeTime: '获取验证码',
      buttonDisable: false
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