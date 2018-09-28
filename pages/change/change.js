// pages/change/change.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldpwd:'',
    newpwd:'',
    surepwd:''
  },
  formSubmit: function (e) {
    //console.log(e);
    var uid = wx.getStorageSync('uid');
    var oldpwd = e.detail.value.oldpwd;
    var newpwd = e.detail.value.newpwd;
    var surepwd = e.detail.value.surepwd;
    var appData = app.globalData;

    if (oldpwd=='') {
      wx.showToast({
        title: '请填写旧密码',
        icon: 'loading',
        duration: 1000
      });
    } else if (newpwd==''){
      wx.showToast({
        title: '请填写新密码',
        icon: 'loading',
        duration: 1000
      });
    } else if (surepwd == '') {
      wx.showToast({
        title: '请确认新密码',
        icon: 'loading',
        duration: 1000
      });
    } else if (surepwd != newpwd) {
      wx.showToast({
        title: '请确认新密码是否一致',
        icon: 'loading',
        duration: 1000
      });
    } else if (newpwd.length<6) {
      wx.showToast({
        title: '密码长度必须为6位或6位以上',
        icon: 'loading',
        duration: 1000
      });
    }else {
      // console.log(uid);
      // console.log(nickname);
      wx.request({
        url: appData.ApiUrl + '/index.php/CardApi/User/edit_pwd',
        data: {
          uid: uid,
          old_password: oldpwd,
          new_password: surepwd
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
           console.log(res);
          if (res.data.status == 1) {
            //修改成功
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 1000
            });
            setTimeout(function () {
              wx.switchTab({
                url: '../user/user'
              })
            }, 1000);
          } else if (res.data.status == -1) {
            wx.showToast({
              title: '原始密码错误',
              icon: 'loading',
              duration: 1000
            });
          }else {
            wx.showToast({
              title: '修改失败',
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