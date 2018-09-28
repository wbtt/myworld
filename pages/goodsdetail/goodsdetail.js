// pages/goodsdetail/goodsdetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.globalData.ApiUrl,
    data: '',
    num: 1,
    minusStatus: 'disabled',
    carnum: 0,
    pid: ''
  },
  directorder: function (e) {
    var _data = this.data;
    var id = _data.data.id;
    var num = _data.num;
    // console.log(num + '|' + id);
    var kucun = e.currentTarget.dataset.id;
    if(num>kucun){
      wx.showToast({
        title: '购买数量不能大于库存',
        icon: 'loading',
        duration: 1000
      })
    }else{
      wx.navigateTo({
        url: '../order/order?id=' + id + '&num=' + num
      });
    } 
  },
  addcart: function () {
    var _carnum = 0;
    var _data = this.data;
    // console.log(_data.num);
    _data.data.count = _data.num;
    // 购物车的缓存数组，没有数据，则赋予一个空数组
    var arr = wx.getStorageSync('cart') || [];

    // 有数据的话，就遍历数据，计算总金额 和 总数量
    if (arr.length > 0) {
      for (var i = 0; i < arr.length; i++) {
        if (_data.data.id == arr[i].id) {
          _data.data.count = parseInt(arr[i].count) + parseInt(_data.num); //给num重新赋值
          arr.splice(i, 1); //删除当前项，重新压入
        }
      }
    }

    arr.push(_data.data);//构建数组

    if (arr.length > 0) {
      for (var i = 0; i < arr.length; i++) {
        _carnum += parseInt(arr[i].count);
      }
    }

    // 最后，把购物车数据，存放入缓存  
    try {
      wx.setStorageSync('cart', arr);
      wx.showToast({
        title: '加入购车成功',
      })
      // 更新数据
      this.setData({
        carnum: _carnum
      });
    } catch (e) {
      console.log(e);
    }
  },
  tocart: function () {
    wx.navigateTo({
      url: '../cart/cart',
    });
  },
  bindMinus: function () {
    var num = this.data.num;
    if (num > 1) {
      num--;
    }
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  bindPlus: function (e) {
    var num = this.data.num;
    var kucun = e.currentTarget.dataset.id;
    num++;
    //console.log(kucun);
    if (num > kucun) {
      this.setData({
        num: kucun,
        minusStatus: minusStatus
      });
      wx.showToast({
        title: '购买数量不能大于库存',
        icon: 'loading',
        duration: 1000
      })
    } else {
      var minusStatus = num < 1 ? 'disabled' : 'normal';
      this.setData({
        num: num,
        minusStatus: minusStatus
      });
    }
  },
  bindManual: function (e) {
    var num = e.detail.value;
    // console.log(num);
    if (num <= 0) {
      num = 1;
    }

    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var appData = app.globalData;
    var pid = options.id;
    // var _id = 1;
   // console.log(pid);

    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/Mall/details',
      data: {
        id: pid
      },
      method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // console.log(res);
        // console.log(res.data.find);
        that.setData({ data: res.data.find });
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
    var _carnum = 0;
    // 获取产品展示页保存的缓存数据（购物车的缓存数组，没有数据，则赋予一个空数组）
    var arr = wx.getStorageSync('cart') || [];
    // 有数据的话，就遍历数据，计算总金额 和 总数量
    if (arr.length > 0) {
      for (var i in arr) {
        _carnum += parseInt(arr[i].count);
      }
      // 更新数据
      this.setData({
        carnum: _carnum
      });
    };
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})