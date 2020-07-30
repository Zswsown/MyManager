// miniprogram/pages/index/index.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    thisUserInfo: [],
    swiperImageFileIDList: [],
    idCardContent: [],
    idCardShow: false,
  },

  //跳转快递界面
  openKuadi(){
    wx.navigateTo({
      url: '../kuaidi/kuaidi',
    })
  },

  //跳转天气界面
  openWeacher(){
    wx.navigateTo({
      url: '../weather/weather',
    })
  },

  //关闭身份证识别窗口
  closeIDCardScreen() {
    this.setData({
      idCardShow: false
    })
  },

  //确认复制后的识别信息
  confirmCopyIDCard(res) {
    var _this = this

    var idCardContent = _this.data.idCardContent
    var name = idCardContent.name.text
    var gender = idCardContent.gender.text
    var nationality = idCardContent.nationality.text
    var birth = idCardContent.birth.text
    var address = idCardContent.address.text
    var id = idCardContent.id.text

    var copyIDCardContent = "姓名:" + name + "\n性别:" + gender + "\n民族:" + nationality + "\n出生日期:" + birth + "\n住址:" + address + "\n公民身份证号:" + id

    this.setData({
      idCardShow: false
    })
    
    //将识别的信息设置系统剪贴板
    wx.setClipboardData({
      data: copyIDCardContent,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) 
          }
        })
      }
    })
  },

  //证件识别
  openIDRecognition(e) {
    var _this = this
    // 选择图片
    wx.chooseImage({
      count: 1,
      success: async function (res) {
        try {
          const invokeRes = await wx.serviceMarket.invokeService({
            service: 'wx79ac3de8be320b71',
            api: 'OcrAllInOne',
            data: {
              // 用 CDN 方法标记要上传并转换成 HTTP URL 的文件
              img_url: new wx.serviceMarket.CDN({
                type: 'filePath',
                filePath: res.tempFilePaths[0],
              }),
              data_type: 3,
              ocr_type: 1
            },
          })

          console.log('invokeService success', invokeRes)
          _this.setData({
            idCardContent: invokeRes.data.idcard_res,
            idCardShow: "ture"
          })
          wx.showToast({
            icon: 'success',
            title: '识别成功',
          })
        } catch (err) {
          console.error('invokeService fail', err)
          wx.showToast({
            icon: 'none',
            title: '识别失败',
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  //地图导航
  openMapNavigation(e) {
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

  //从数据库得到轮播图照片
  getSwiperImageFileIDList() {
    var _this = this
    const db = wx.cloud.database()
    db.collection('swiperImageFileIDList').get().then(res => {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      _this.setData({
        swiperImageFileIDList: res.data
      })
      console.log(this.data.swiperImageFileIDList)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperImageFileIDList()
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