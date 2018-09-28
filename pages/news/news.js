// pages/news/news.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    },
    //数据
    array: [],
    brray: [],
    crray: [],
    ay: [],
    cid: ''
  },
  todetail: function (e) {
    // console.log(e);
    var id = e.currentTarget.dataset.id;
    // console.log(id);
    wx.navigateTo({
      url: '../press/press?id=' + id
    })
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
  //查看更多新闻分类
  // newscategory: function () {
  //   wx.navigateTo({
  //     url: '../press/press?id='
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var appData = app.globalData;
    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/News/get_news_list',
      data: {
        index: 1
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
          for (var i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].cid == 1) {
              arr.push(res.data.data[i]);
              that.setData({ array: arr });
             // console.log(that.data.array);
            }
            if (res.data.data[i].cid == 4) {
              brr.push(res.data.data[i]);
              that.setData({ brray: brr });
            }
            if (res.data.data[i].cid == 7) {
              crr.push(res.data.data[i]);
              that.setData({ crray: crr });
            }
          }
        }
      }
    });


    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/News/get_news_category',
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //console.log(res);
        if (res.data.status == 1) {
          that.setData({ ay: res.data.data });
        }
        //console.log(that.data.ay);
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
    this.onLoad();
    wx.stopPullDownRefresh();
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