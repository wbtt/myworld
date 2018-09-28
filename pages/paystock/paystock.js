// pages/pay/pay.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    disabled: true,
    orderno: '',
    money: '',
    openid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.getUserInfo);
   
    //console.log(options);
    var that = this;
    var appData = app.globalData;
    var _orderno = options.orderno;
    var _money = options.money;
    that.setData({ orderno: _orderno, money: _money, disabled: true });
    //console.log(appData);
    wx.login({
      success: function (res) {
        //console.log(res.code);
        if (res.code) {
          //发起网络请求
          //获取openid
          wx.request({
            url: appData.ApiUrl + '/index.php/CardApi/User/getOpenid?code=' + res.code,
            // url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appData.appid + '&secret=' + appData.secret + '&grant_type=authorization_code&js_code=' + res.code,
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              // console.log(res);
              console.log(res.data.openid) //获取openid
              that.setData({ openid: res.data.openid, disabled: false });
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  formSubmit: function (e) {
    var that = this;
    var _data = this.data;
    //console.log(_data);
    var _money = this.data.money;
    var appData = app.globalData;
    var _uid = wx.getStorageSync('uid');

    that.setData({ loading: true, disabled: true });

    console.log(_data);
    wx.request({
      url: appData.ApiUrl + '/wxpay/pay/jsapi.php',
      data: _data,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        wx.requestPayment({
          'timeStamp': res.data.timeStamp,
          'nonceStr': res.data.nonceStr,
          'package': res.data.package,
          'signType': 'MD5',
          'paySign': res.data.paySign,
          'success': function (ress) {
            // console.log(ress);
            if (ress.errMsg == "requestPayment:ok") {
              wx.request({
                url: appData.ApiUrl + '/index.php/CardApi/Mall/wx_piao',
                data: {
                  uid: _uid,
                  orderno: _data.orderno
                },
                method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (rrs) {
                  console.log(rrs);
                  if (rrs.data.status == 1) {
                    wx.showToast({
                      title: '购买成功',
                      icon: 'success',
                      duration: 1000
                    });
                    setTimeout(function () {
                      wx.switchTab({
                        url: '../user/user',
                        success: function (e) {
                          var page = getCurrentPages().pop();
                          if (page == undefined || page == null) return;
                          page.onLoad();
                        }
                      })
                    }, 1000);
                  } else {
                    wx.showToast({
                      title: '购买失败',
                      icon: 'loading',
                      duration: 1000
                    });
                  }
                }
              });
            }
          },
          'fail': function (resss) {
            //console.log(resss);
          }
        })
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