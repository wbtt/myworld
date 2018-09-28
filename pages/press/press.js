// pages/press/press.js
//获取应用实例
var app = getApp()
Page({
  onShareAppMessage: function () {
    return {
      // title: '安培斯通pro',
      // desc: '自定义转发内容!',
      path: '/pages/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    newlist: [],
    like_number: 0,
    srcxiang: '',
    height: false,
    maxheight: '60',
    autoheight: true
  },
  bindfocus: function () {
    this.setData({
      height: true,
      maxheight: '60'
    })
  },
  bindblur: function () {
    this.setData({
      height: false,
      autoheight: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    var that = this;
    var uid = wx.getStorageSync('uid');
    var appData = app.globalData;
    var newid = options.id;
    // console.log(newid);
    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/News/get_news_info',
      data: {
        news_id: newid,
        uid: uid
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //  console.log(res);
        var src = "";
        if (res.data.data.is_collection) {
          src = "../../assets/img/xing.png";
        } else {
          src = "../../assets/img/xing2.png";
        }
        //console.log(src);
        that.setData({ array: res.data.data, like_number: res.data.data.like_number, srcxiang: src });

      }
    });

    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/News/get_news_comment',
      data: {
        news_id: newid
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        that.setData({ newlist: res.data.data });

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
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  tapName: function (e) {
    //获取新闻ID和用户的ID
    var newid = e.currentTarget.dataset.id;
    var uid = wx.getStorageSync('uid');
    var that = this;
    var appData = app.globalData;
    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/News/set_news_like',
      data: {
        news_id: newid,
        uid: uid
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data.like_number);
        var like = res.data.like_number;
        that.setData({
          like_number: like
        });
      }
    });
  },
  //收藏 和取消收藏
  xiangName: function (e) {
    //获取新闻ID和用户的ID
    var newid = e.currentTarget.dataset.newid;
    var uid = wx.getStorageSync('uid');
    var that = this;
    var appData = app.globalData;
    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/News/set_news_collection',
      data: {
        news_id: newid,
        uid: uid
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        var src = "";
        if (res.data.status == 1) {
          src = "../../assets/img/xing.png";
        } else {
          src = "../../assets/img/xing2.png";
        }
        that.setData({
          srcxiang: src
        });
      }
    });
  },
  //新闻评论
  formReset: function (e) {
    //获取新闻ID和用户的ID
    var newid = e.currentTarget.dataset.text;
    var uid = wx.getStorageSync('uid');
    console.log(newid);
    var content = e.detail.value.textname;
    var that = this;
    var appData = app.globalData;
    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/News/set_news_comment',
      data: {
        news_id: newid,
        uid: uid,
        content: content
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        if (res.data.status == 1) {
          wx.showToast({
            title: '评论成功！',
            icon: 'success',
            duration: 1000
          });
          that.setData({
            content: '', 
            maxheight:'60',
            autoheight: false,
            form: true
          });
          this.onLoad();
        } else if (res.data.status == -2) {
          wx.showToast({
            title: '登陆后才能评论！',
            icon: 'loading',
            duration: 1000
          });
        } else {
          wx.showToast({
            title: '请输入内容后再提交！',
            icon: 'loading',
            duration: 1000
          });
        }
      }
    });
  }

})
