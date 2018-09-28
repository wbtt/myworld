// pages/order/order.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.globalData.ApiUrl,
    disabled: false,
    loading: false,
    uid:'',
    user: '',
    data: '',
    id: 0,
    num: 1,
    total: 0,
    goodsCount: 0, //数量
    cart: [], //数据
    obj: '',
  },
  saveOrder: function (e) {
    // console.log(e);
    var that = this;
    var _data = this.data;
    var _aid = _data.user.aid;
    var _gid = _data.id;
    var _num = _data.num;
    var _total = _data.total;
    var _uid = wx.getStorageSync('uid');
    var appData = app.globalData;
    var _uId = e.currentTarget.dataset.id;
    that.setData({ disabled: true, loading: true });

    if (_data.obj != "") {
      _gid = _data.obj;
      _num = _data.goodsCount;
      // console.log(_gid);
      // console.log(_num);
    }

    if (_uId == undefined || _uId == ''){
      wx.showToast({
        title: '登陆后才能购买！',
        icon: 'loading',
        duration: 2000
      });
      wx.navigateTo({
        url: '../login/login'
      });
    }else{
      //下单
      wx.request({
        url: appData.ApiUrl + '/index.php/CardApi/Mall/saveOrder',
        data: {
          aid: _aid,
          gid: _gid,
          num: _num,
          uid: _uid,
          total: _total
        },
        method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res);
          if (res.data.status == 1) {
            wx.showToast({
              title: '下单成功'
            });
            if (_data.obj != "") {
              wx.removeStorageSync('cart');
            }
            setTimeout(function () {
              wx.redirectTo({
                url: '../orderdetail/orderdetail?oid=' + res.data.oid,
              });
            }, 1000);
          } else {
            wx.showToast({
              title: '暂无收货地址请添加',
              icon: 'loading',
              duration: 2000
            });
            // wx.navigateTo({
            //   url: '../shipaddress/shipaddress'
            // });
            that.addShipAddress();
          }
        }
      });
    }
  },
  addShipAddress: function () {
    // console.log(this.data.id +'|'+ this.data.num);
    console.log(this.data.obj);
    if (this.data.obj != '') {
      wx.navigateTo({
        url: '../shipaddress/shipaddress?obj=' + this.data.obj
      })
    } else {
      wx.navigateTo({
        url: '../shipaddress/shipaddress?id=' + this.data.id + '&num=' + this.data.num
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     console.log(options);
    var that = this;
    var appData = app.globalData;
    var _uid = wx.getStorageSync('uid');
    that.setData({ uid: _uid });
    if (typeof (options.obj) != "undefined") {
      var _obj = options.obj;
      that.setData({ obj: _obj });
    } else {
      var _id = options.id;
      var _num = options.num;
    }

    //获取默认收货地址
    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/User/get_shipping_address',
      data: {
        uid: _uid
      },
      method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        if (res.data.status == 1) {
          that.setData({ user: res.data.data[0] });
        }
      }
    });



    if (typeof (options.obj) != "undefined") {
      // 获取产品展示页保存的缓存数据（购物车的缓存数组，没有数据，则赋予一个空数组）
      var arr = wx.getStorageSync('cart') || [];
      // 有数据的话，就遍历数据，计算总金额 和 总数量
      if (arr.length > 0) {
        for (var i in arr) {
          this.data.total += (Number(arr[i].goodsprice) * Number(arr[i].count));
          this.data.goodsCount += Number(arr[i].count);
        }

        // 更新数据
        this.setData({
          // iscart: true,
          cart: arr,
          total: (this.data.total).toFixed(2),
          goodsCount: this.data.goodsCount
        });
      }


      // console.log(JSON.parse(_obj));
      // wx.request({
      //   url: appData.ApiUrl + '/index.php/CardApi/Mall/multiDetails',
      //   data: {
      //     obj: _obj
      //   },
      //   method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      //   header: {
      //     'content-type': 'application/x-www-form-urlencoded'
      //   },
      //   success: function (res) {
      //     console.log(res.data.data);
      //     // console.log(res.data.find);
      //     // var _total = (parseInt(_num) * parseFloat(res.data.find.goodsprice)).toFixed(2);
      //     // that.setData({ data: res.data.find, id: _id, num: _num, total: _total });
      //   }
      // });
    } else {
      wx.request({
        url: appData.ApiUrl + '/index.php/CardApi/Mall/details',
        data: {
          id: _id
        },
        method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          // console.log(res);
         // console.log(res.data.find);
          var _total = (parseInt(_num) * parseFloat(res.data.find.goodsprice)).toFixed(2);
          that.setData({ data: res.data.find, id: _id, num: _num, total: _total });
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