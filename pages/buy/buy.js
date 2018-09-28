// pages/sell/sell.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    numb: '0',
    flag1: true,
    flag2: true,
    assets:'0'
  },
  a1: function () {
    this.setData({ flag1: false })
  },
  b1: function () {
    this.setData({ flag1: true })
  },
  formSubmit: function (e) {
    var num = e.detail.value.num;
    var id = e.currentTarget.dataset.id;
    var numb = parseInt(e.detail.value.numb);
    var uid = wx.getStorageSync('uid');
    var that = this;
    var appData = app.globalData;
    var sel = e.detail.value.checkbox_group.length;
    console.log(numb);
    if ( num==''){
      wx.showToast({
        title: '请输入买入股数',
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
      url: appData.ApiUrl + '/index.php/CardApi/User/product_buy_roder',
      data: {
        uid: uid,
        pid: id,
        number:num
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //console.log(res);
        var oid = res.data.data.id;
        var money = res.data.data.money;
        wx.navigateTo({
          url: '../buystock/buystock?oid=' + oid + '&money=' + money,
        }) 
      }
    });
       
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options);
    var pid = options.id;
    var uid = wx.getStorageSync('uid');
    var _userInfo = wx.getStorageSync('user_info');
    this.setData({ assets: _userInfo.assets });
    var that = this;
    var appData = app.globalData;
    //console.log(pid);
    
    if (uid != undefined || uid != '') {
      wx.request({
        url: appData.ApiUrl + '/index.php/CardApi/User/get_user_product',
        data: {
          uid: uid,
          pid: pid
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res);
          that.setData({
            new: res.data.new,
            numb: res.data.number,
            pid: pid
          });
          //console.log(pid);
          // var user_info = res.data.data;
          // that.setData({
          //   userInfo: user_info,
          // });
          // wx.setStorageSync('user_info', user_info);
          // 已读
          wx.request({
            url: appData.ApiUrl + '/index.php/CardApi/User/get_stock_save',
            data: {
              uid: uid
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
            }
          });
        }
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