// pages/join/join.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: '',
    array: ['请选择银行','工商银行', '农业银行', '建设银行', '中国银行', '中信银行', '光大银行', '交通银行', '民生银行','上海浦东发展银行','招商银行','平安银行','兴业银行','邮政储蓄银行'],
    name: '',
    my_name:'',
    index:0
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  formSubmit: function (e) {
    //console.log(e);
    var uid = wx.getStorageSync('uid');
    var num = e.detail.value.num;
    var name = e.detail.value.name;
    var designation = e.detail.value.designation;
    var myName = e.detail.value.myName;
    var appData = app.globalData;
    //console.log(name);
    if (myName == '') {
      wx.showToast({
        title: '请前去身份验证',
        icon: 'loading',
        duration: 1000
      });
    }else if (num == '') {
      wx.showToast({
        title: '请填写银行卡号',
        icon: 'loading',
        duration: 1000
      });
    } else if (name == '') {
      wx.showToast({
        title: '请选择银行名称',
        icon: 'loading',
        duration: 1000
      });
    } else if (name == '请选择银行') {
      wx.showToast({
        title: '请选择银行名称',
        icon: 'loading',
        duration: 1000
      });
    }else if (designation == '') {
      wx.showToast({
        title: '请填写开户行',
        icon: 'loading',
        duration: 1000
      });
    }else {
      // console.log(uid);
      // console.log(nickname);
      wx.request({
        url: appData.ApiUrl + '/index.php/CardApi/User/set_bank_card',
        data: {
          uid: uid,
          card_number: num,
          bank_name: name,
          name: myName,
          open_bank: designation
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          //console.log(res);
          if (res.data.status == 1) {
            //修改成功
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 1000
            });
            setTimeout(function () {
              wx.switchTab({
                url: '../user/user'
              })
            }, 1000);
          } else {
            wx.showToast({
              title: '添加失败',
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
    var uid = wx.getStorageSync('uid');
    var appData = app.globalData;
    var that = this;
    wx.request({
      url: appData.ApiUrl + '/index.php/CardApi/User/get_id_auth',
      data: {
        uid: uid,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        if (res.data.status == 1) {
          //修改成功
          that.setData({
            my_name: res.data.data.name
          })
        } else {
          wx.showToast({
            title: '请去身份认证',
            icon: 'loading',
            duration: 5000
          });
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