// pages/withdrawal/withdrawal.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    brray:[],
    index: 0,
    withdrawal: '',
    assets : '',
    frozen:'',
    card:''
  },
  bindPickerChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  all:function(e){
   // console.log(assets);
    var appData = app.globalData;
    var that = this;
    var uid = wx.getStorageSync('uid');
    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/User/get_balance',
      data: {
        uid: uid
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //console.log(res);
        if (res.data.status == 1) {
          that.setData({ withdrawal: res.data.data[uid].assets });
          //that.setData({ frozen: res.data.data[uid].frozen });
        } else {
          //暂无列表数据
        }
      }
    })
  },
  formSubmit: function (e) {
    //console.log(e.detail.value);
    var uid = wx.getStorageSync('uid');
    var _withdrawal = e.detail.value.withdrawal;
    var surepwd = e.detail.value.num;
    var appData = app.globalData;
    var _ass = e.detail.value.ass;
    var _card = e.detail.value.card;
    //console.log(surepwd);
    //console.log(_withdrawal);
    if (_withdrawal == '') {
      wx.showToast({
        title: '请输入提现金额',
        icon: 'loading',
        duration: 1000
      });
    } else if (_withdrawal < 10) {
      wx.showToast({
        title: '提现金额必须大于或等于10元',
        icon: 'loading',
        duration: 1000
      });
    } else if (_withdrawal>_ass) {
      wx.showToast({
        title: '提现金额不能大于可提现金额',
        icon: 'loading',
        duration: 1000
      });
    } else if (_card=='') {
      wx.showToast({
        title: '请添加银行卡',
        icon: 'loading',
        duration: 1000
      });
      setTimeout(function () {
        wx.navigateTo({
          url: '../bankcard/bankcard'
        });
      }, 1000)
    }else {
      //console.log(surepwd);
      wx.request({
        url: appData.ApiUrl + '/index.php/CardApi/User/set_withdrawals',
        data: {
          uid: uid,
          money: _withdrawal,
          bank_id: surepwd
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          //console.log(res.data.assets.assets);
          var _assets = res.data.assets.assets;
         // console.log(assets);
          if (res.data.status == 1) {
            wx.showToast({
              title: '提现成功',
              icon: 'success',
              duration: 1000
            });
            setTimeout(function () {
              wx.redirectTo({
                url: '../recdown/recdown?money=' + _withdrawal + '&assets=' + _assets
              })
            }, 1000);
          } else {
            wx.showToast({
              title: '提现失败',
              icon: 'loading',
              duration: 1000
            });
          }
        }
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   //console.log(options);
    var uid = wx.getStorageSync('uid');
    var appData = app.globalData;
    var that = this;
    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/User/get_bank_list',
      data: {
        uid: uid
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var arr = [];
        var brr = [];
        var array = [];
        var brray = [];
        // console.log(res.data.data[0]);
        for (var i = 0; i < res.data.data.length; i++) {
          //console.log(res.data.data.length);
          //var arr = res.data.data[i].bank_name+res.data.data[i].card_number;
          arr.push(res.data.data[i].bank_name + res.data.data[i].card_number);
          brr.push(res.data.data[i].bid);
          //array.push(arr);
          that.setData({ array: arr });
          that.setData({ brray: brr });
          //console.log(brr);
          //console.log(brray);
        }
        
        //console.log(array);
        //console.log(arr);

  
      }
    }),
      wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/User/get_balance',
        data: {
          uid: uid
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          //console.log(res);
          if (res.data.status == 1) {
            that.setData({ assets: res.data.data[uid].assets});
            that.setData({ frozen: res.data.data[uid].frozen });
          } else {
            //暂无列表数据
          }
        }
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