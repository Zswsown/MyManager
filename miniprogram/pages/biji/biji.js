// miniprogram/pages/biji/biji.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addBijiContainerShow: false,
    bijiList: []
  },

  //关闭新建日记的窗口
  closeAddBijiContainer() {
    this.setData({
      addBijiContainerShow: false,
    })
  },

  //打开新建日记的窗口
  openAddBiji(){
    this.setData({
      addBijiContainerShow: true,
    })
  },

  //按确定按钮后，执行添加日记操作
  addBiji(e) {
    var _this = this
    const db = wx.cloud.database()
    var bijiContent = e.detail.value.bijiContent
    var date = new Date()
    var bijiTime = date.getFullYear() + '-' + _this.repair0(date.getMonth() + 1) + '-' + _this.repair0(date.getDate()) + ' ' + _this.repair0(date.getHours()) + ':' + _this.repair0(date.getMinutes())
    if (bijiContent == "") {
      wx.showToast({
        icon: 'none',
        title: '内容为空！',
      })
    }
    else {
      var obj = {
        bijiContent: bijiContent,
        bijiTime: bijiTime
      }
      db.collection('bijiList').add({
        // data 字段表示需新增的 JSON 数据
        data: obj
      })
        .then(res => {
          _this.getRijiList()
          _this.setData({
            addBijiContainerShow: false
          })
        })
    }
  },

  //日期补零
  repair0(val) {
    return val < 10 ? "0" + val : val
  },

  getRijiList() {
    var _this = this
    const db = wx.cloud.database()
    db.collection('bijiList').get().then(res => {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      _this.setData({
        bijiList: res.data
      })
      console.log(_this.data.bijiList)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRijiList()
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