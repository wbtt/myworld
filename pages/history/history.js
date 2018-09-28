// pages/history/history.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    },
    array: [],
    brray: [],
    crray: []
  },
  tabFun: function (e) {
    //获取触发事件组件的dataset属性 
    var _datasetId = e.target.dataset.id;
    //console.log("----" + _datasetId + "----");
    var _obj = {};
    _obj.curHdIndex = _datasetId;
    _obj.curBdIndex = _datasetId;
    this.setData({
      tabArr: _obj
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;
    var appData = app.globalData;
    var uid = wx.getStorageSync('uid');
    console.log(appData);
    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/User/get_ticket_log',
      data: {
        uid: uid
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        
        console.log(res);
        if (res.data.status == 1) {
          var arr = [];
          var brr = [];
          var crr = [];
          var datas = res.data.data;
          for (var i = 0; i < datas.length; i++) {
            if (datas[i].status == 0) {
              arr.push(datas[i]);
            } else if (datas[i].status == 1){
              brr.push(datas[i]);
            }else{
              crr.push(datas[i]);
            }
          }

          if (arr.length > 0) {
            that.setData({array: arr});
          }
          if (brr.length > 0) {
            that.setData({brray: brr});
          } 
          if (crr.length > 0) {
            that.setData({crray: crr});
          }
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