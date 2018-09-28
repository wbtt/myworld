// pages/law/law.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj:{}
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options);
    var that = this;
    var scid = options.id;
    var appData = app.globalData;
    var _title = '';

    if (scid == 1) {
      _title = '法律声明';
    } else if (scid == 2) {
      _title = '平台规则';
    } else if (scid == 3) {
      _title = '国际运输';
    } else if (scid == 4) {
      _title = '如何交易';
    } else if (scid == 5) {
      _title = '加入我们';
    } else if (scid == 6) {
      _title = '联系我们';
    } else {
      _title = '服务中心';
    }
    wx.setNavigationBarTitle({
      title: _title
    });
    
    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/User/get_service_content',
      data: {
        scid: scid
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //console.log(res);
        if (res.data.statuc == 1) {
          that.setData({obj:res.data.data[0]});
          //console.log(that.setData({ obj: res.data.data[0] }));
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