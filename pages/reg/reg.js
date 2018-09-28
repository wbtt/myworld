// pages/reg/reg.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag1: true
  },
  a1: function () {
    this.setData({ flag1: false })
  },
  b1: function () {
    this.setData({ flag1: true })
  },
  login: function () {
    wx.navigateTo({
      url: '../login/login'
    })
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
          verifyCodeTime: '点击获取',
          buttonDisable: false
        })
      }
    }, 1000)
    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/Login/getSmsCode',
      data: {
        tel:phone
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
      }
    });
  },
  formSubmit: function (e) {
    //console.log(e.detail.value.verify);
    //console.log(e.detail.value.phone);
    // console.log(e.detail.value);
    //console.log(e.detail.value.checkbox_group.length);
    var that = this;
    var fmData = e.detail.value;
    var appData = app.globalData;
    var sel = e.detail.value.checkbox_group.length;
    var postData = {
      tel: fmData.phone,
      password: fmData.password,
      email: fmData.email,
      nickname: fmData.nickname,
      verify: fmData.verify
    };
  
    if (postData.tel == '') {
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
    if (postData.verify==''){
      wx.showToast({
        title: '请输入验证码',
        icon: 'loading',
        duration: 1000
      });
      return false;
    }
    if (sel == 0) {
      wx.showToast({
        title: '请先同意安培斯通使用协议',
        icon: 'loading',
        duration: 1000
      });
      return false;
    }
    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/Login/reg',
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
            title: '注册成功，请登录',
            icon: 'success',
            duration: 1000
          });
          setTimeout(function(){
            wx.navigateTo({
              url: '../login/login'
            });
          }, 1000);
        } else if (res.data.status == -2) {
          //注册成功
          wx.showToast({
            title: '验证码不正确',
            icon: 'loading',
            duration: 1000
          });
        }
        else if (res.data.status == -3) {
          //注册成功
          wx.showToast({
            title: '手机号已被注册',
            icon: 'loading',
            duration: 1000
          });
        }
         else {
          wx.showToast({
            title: '注册失败',
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
    this.setData({
      verifyCodeTime: '点击获取',
      buttonDisable: false
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