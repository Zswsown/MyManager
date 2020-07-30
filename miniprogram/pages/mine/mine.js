// miniprogram/mine/mine.js
var app = getApp()
var userInfo = app.globalData.userInfo

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    thisUserInfo: {
      avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/LFCmIp7oQDElAWtfsnT6lKRxlQVdp1c9SAkofmemtk2AYkc6FFg9qOp5ytUQ6sIfn5JHTksz8DW0gwiaxWKqpbg/132",
      country: "布维岛",
      gender: 1,
      language: "zh_CN",
      nickName: "Zswsown",
    }
  },

  close(){
    this.setData({
      show:false,
    })
  },

  //给个赞赏
  sendGift(){
    wx.previewImage({
      urls: ['cloud://mymanager-43jvk.6d79-mymanager-43jvk-1302306662/myGiftImage/Zswsown.png'],
  });
  },

  //联系作者
  makePhoneCall() {
    wx.makePhoneCall({
      phoneNumber: '13060886740',
      complete: (res) => {
        console.log("拨打电话成功！")
      },
      fail: (res) => {
        console.log("拨打电话失败！")
      },
      success: (res) => {
        console.log("拨打电话成功！")
      },
    })
  },

  //获取到学校的位置信息
  getGdufAddress(e) {
    let plugin = requirePlugin('routePlan');
    let key = 'IN7BZ-YZGCP-QT3DE-VCCGN-4KFOJ-X7BLY'; //使用在腾讯位置服务申请的key
    let referer = 'MyManager'; //调用插件的app的名称
    let endPoint = JSON.stringify({ //终点
      'name': '广东金融学院',
      'latitude': 23.207203,
      'longitude': 113.387067
    });
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
    });
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