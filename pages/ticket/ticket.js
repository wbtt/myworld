// pages/ticket/ticket.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag2: true,
    flag3: true
  },
  a2: function () {
    this.setData({ flag2: false })
  },
  b2: function () {
    this.setData({ flag2: true })
  },
  a3: function () {
    this.setData({ flag3: false })
  },
  b3: function () {
    this.setData({ flag3: true })
  },
  mobileInputEvent: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  find_order:function(){
    wx.navigateTo({
      url: '../findor/findor',
    })
  },
  // setVerify: function (e) {//发送验证码
  //   var that = this;
  //   var appData = app.globalData
  //   var phone = this.data.phone;
  //   //console.log(phone);
  //   if (this.data.buttonDisable) return false;
  //   var mobile = this.data.mobile;
  //   var regMobile = /^1\d{10}$/;
  //   if (!regMobile.test(phone)) {
  //     wx.showToast({
  //       title: '手机号有误！',
  //       icon: 'loading',
  //       duration: 1000
  //     })
  //     return false;
  //   }
  //   var c = 60;
  //   var intervalId = setInterval(function () {
  //     c = c - 1;
  //     that.setData({
  //       verifyCodeTime: c + 's后重发',
  //       buttonDisable: true
  //     })
  //     if (c == 0) {
  //       clearInterval(intervalId);
  //       that.setData({
  //         verifyCodeTime: '点击获取',
  //         buttonDisable: false
  //       })
  //     }
  //   }, 1000)
  //   wx.request({
  //     url: appData.ApiUrl + '/index.php/CardApi/Login/getSmsCode',
  //     data: {
  //       tel: phone
  //     },
  //     method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded'
  //     },
  //     success: function (res) {
  //       //console.log(res);
  //     }
  //   });
  // },
  formSubmit: function (e) {
    var that = this;
    var fmData = e.detail.value;
    var appData = app.globalData;
    var uid = wx.getStorageSync('uid');

    //console.log(fmData);
    var postData = {};

    if (fmData.order_no == '') {
      wx.showToast({
        title: '请输入订单号',
        icon: 'loading',
        duration: 1000
      });
      return false;
    }
    if (fmData.order_no.length < 11 || fmData.order_no.length > 11) {
      wx.showToast({
        title: '订单号不正确',
        icon: 'loading',
        duration: 1000
      });
      return false;
    }
    if (fmData.share_code == '') {
      wx.showToast({
        title: '请输入分享码',
        icon: 'loading',
        duration: 1000
      });
      return false;
    }
    // if (fmData.phone == '') {
    //   wx.showToast({
    //     title: '请输入电话号码',
    //     icon: 'loading',
    //     duration: 1000
    //   });
    //   return false;
    // }
    // if (!(/^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/.test(fmData.phone))) {
    //   wx.showToast({
    //     title: '电话号码格式不正确',
    //     icon: 'loading',
    //     duration: 1000
    //   });
    //   return false;
    // }
    // if (fmData.verify == '') {
    //   wx.showToast({
    //     title: '请输入验证码',
    //     icon: 'loading',
    //     duration: 1000
    //   });
    //   return false;
    // }
    if (fmData.radio_group == '') {
      wx.showToast({
        title: '请阅读《安培斯通关于领票时的法律责任》，并勾选',
        icon: 'loading',
        duration: 1000
      });
      return false;
    }

    postData = {
      order_no: fmData.order_no,
      share_code: fmData.share_code,
      uid: uid
    }

    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/User/get_ticket',
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
            title: '提交成功',
            icon: 'success',
            duration: 3000
          });
          setTimeout(function () {
            wx.switchTab({
              url: '../user/user'
            });
          }, 1000);
        } else if (res.data.status == -2) {
          //注册成功
          wx.showToast({
            title: "订单号有误",
            icon: 'loading',
            duration: 1000
          });
        } else if (res.data.status == -3) {
          //注册成功
          wx.showToast({
            title: "验证码有误",
            icon: 'loading',
            duration: 1000
          });
        } else {
          wx.showToast({
            title: '提交失败',
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
    });
    var that = this;
    var uid = wx.getStorageSync('uid');
    var appData = app.globalData;
    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/User/get_user_code',
      data: {
        uid:uid
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        var P_code = res.data.data;
        if (P_code =='' ) {
          //注册成功
          that.setData({
            code: P_code,
          });
        } else {
          that.setData({
            code: P_code,
          });
        }
      }
    });
    //console.log(code);
    if (uid == undefined || uid == '') {
      wx.navigateTo({
        url: '../login/login'
      });
    }
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