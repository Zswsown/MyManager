// miniprogram/pages/kuaidi/kuaidi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switchChecked: false,
    phoneDisable: true,
    queryResultshow: true,
    queryResultList: [],

    apiUrl: 'http://jisukdcx.market.alicloudapi.com/express/query',
    type: 'auto',
    apiAppCode: "APPCODE 91ba17e7e9284d3988a48b7fb685dd33"
  },

  //若是顺丰快递，则可以填写手机号码，否则不可以填写手机号码
  switchChange(e) {
    if (e.detail.value) {
      this.setData({
        phoneDisable: false
      })
    }
    else {
      this.setData({
        phoneDisable: true,
      })
    }
  },

  openQueryKuaidi(e) {
    var _this = this
    var inputNumber = e.detail.value.inputNumber
    var inputPhoneNumber = e.detail.value.inputPhoneNumber
    var switchStatus = e.detail.value.switch
    if (inputNumber != "") {
      if (!switchStatus) {
        if (inputPhoneNumber != "") {
          wx.showToast({
            icon: 'none',
            title: '格式错误！',
          })
        }
        else {
          _this.queryKuaidi1(inputNumber)
        }
      }
      else {
        if (inputPhoneNumber == "") {
          wx.showToast({
            icon: 'none',
            title: '请填写手机号码！',
          })
        }
        else {
          if (!(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(parseInt(inputPhoneNumber)))) {
            wx.showToast({
              title: '手机号码有误',
              icon: 'none'
            });
          }
          else {
            console.log(inputNumber,inputPhoneNumber)
            _this.queryKuaidi2(inputNumber, inputPhoneNumber)
          }
        }
      }
    }
    else {
      wx.showToast({
        icon: 'none',
        title: '内容为空，请填写！',
      })
    }
  },


  queryKuaidi1(inputNumber) {
    var _this = this
    wx.request({
      url: 'https://jisukdcx.market.alicloudapi.com/express/query?number=' + inputNumber + '&type=auto', //仅为示例，并非真实的接口地址
      header: {
        "Authorization": "APPCODE 91ba17e7e9284d3988a48b7fb685dd33",
        // 默认值
      },
      success(res) {
        if (res.data.msg == "ok") {
          _this.setData({
            queryResultList: res.data.result.list
          })
          console.log(_this.data.queryResultList)
        }
        else {
          wx.showToast({
            icon: 'none',
            title: '服务器繁忙，请稍后再试！',
          })
        }
      }
    })
  },

  queryKuaidi2(inputNumber, inputPhoneNumber) {
    var _this=this
    wx.request({
      url: 'https://jisukdcx.market.alicloudapi.com/express/query?number=' + inputNumber + '&mobile=' + inputPhoneNumber + '&type=auto', //仅为示例，并非真实的接口地址
      header: {
        "Authorization": "APPCODE 91ba17e7e9284d3988a48b7fb685dd33",
        // 默认值
      },
      success(res) {
        if (res.data.msg == "ok") {
          _this.setData({
            queryResultList: res.data.result.list
          })
          console.log(_this.data.queryResultList)
        }
        else {
          wx.showToast({
            icon: 'none',
            title: '服务器繁忙，请稍后再试！',
          })
        }
      }
    })
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