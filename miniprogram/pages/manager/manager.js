// miniprogram/manager/manager.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHide: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    //word
    wordDialogShow: false,//word窗口显示变量
    wordButtons: [{//word窗口内的按钮
      type: 'default',
      text: '上传',
      value: 0
    },
    {
      type: 'default',
      text: '下载',
      value: 1
    }
    ],

    //ppt
    pptDialogShow: false,//ppt窗口显示变量
    pptButtons: [{//ppt窗口内的按钮
      type: 'default',
      text: '上传',
      value: 0
    },
    {
      type: 'default',
      text: '下载',
      value: 1
    }
    ],

    //excel
    excelDialogShow: false,//excel窗口显示变量
    excelButtons: [{//excel窗口内的按钮
      type: 'default',
      text: '上传',
      value: 0
    },
    {
      type: 'default',
      text: '下载',
      value: 1
    }
    ],

    //rar
    rarDialogShow: false,//rar窗口显示变量
    rarButtons: [{//rar窗口内的按钮
      type: 'default',
      text: '上传',
      value: 0
    },
    {
      type: 'default',
      text: '下载',
      value: 1
    }
    ],

    //image
    imageDialogShow: false,//image窗口显示变量
    imageButtons: [{//image窗口内的按钮
      type: 'default',
      text: '上传',
      value: 0
    },
    {
      type: 'default',
      text: '下载',
      value: 1
    }
    ],

    //psd
    psdDialogShow: false,//psd窗口显示变量
    psdButtons: [{//psd窗口内的按钮
      type: 'default',
      text: '上传',
      value: 0
    },
    {
      type: 'default',
      text: '下载',
      value: 1
    }
    ],
  },

  //打开word窗口
  wordDialogOpen() {
    this.setData({
      wordDialogShow: true
    })
  },

  //点击word窗口内的按钮
  wordButtonTap(e) {
    var type = e.detail.item.value
    if (type == 0) {
      wx.navigateTo({
        url: '../word/word',
      })
      this.setData({
        wordDialogShow: false
      })
    } else if (type == 1) {
      wx.navigateTo({
        url: '../wordDownload/wordDownload',
      })
      this.setData({
        wordDialogShow: false
      })
    }
  },

  //打开ppt窗口
  pptDialogOpen() {
    this.setData({
      pptDialogShow: true
    })
  },

  //点击ppt窗口内的按钮
  pptButtonTap(e) {
    var type = e.detail.item.value
    if (type == 0) {
      wx.navigateTo({
        url: '../ppt/ppt',
      })
      this.setData({
        pptDialogShow: false
      })
    } else if (type == 1) {
      wx.navigateTo({
        url: '../pptDownload/pptDownload',
      })
      this.setData({
        pptDialogShow: false
      })
    }
  },

  //打开excel窗口
  excelDialogOpen() {
    this.setData({
      excelDialogShow: true
    })
  },

  //点击excel窗口内的按钮
  excelButtonTap(e) {
    var type = e.detail.item.value
    if (type == 0) {
      wx.navigateTo({
        url: '../excel/excel',
      })
      this.setData({
        excelDialogShow: false
      })
    } else if (type == 1) {
      wx.navigateTo({
        url: '../excelDownload/excelDownload',
      })
      this.setData({
        excelDialogShow: false
      })
    }
  },

  //打开rar窗口
  rarDialogOpen() {
    this.setData({
      rarDialogShow: true
    })
  },

  //点击rar窗口内的按钮
  rarButtonTap(e) {
    var type = e.detail.item.value
    if (type == 0) {
      wx.navigateTo({
        url: '../rar/rar',
      })
      this.setData({
        rarDialogShow: false
      })
    } else if (type == 1) {
      wx.navigateTo({
        url: '../rarDownload/rarDownload',
      })
      this.setData({
        rarDialogShow: false
      })
    }
  },

  //打开image窗口
  imageDialogOpen() {
    this.setData({
      imageDialogShow: true
    })
  },

  //点击image窗口内的按钮
  imageButtonTap(e) {
    var type = e.detail.item.value
    if (type == 0) {
      wx.navigateTo({
        url: '../image/image',
      })
      this.setData({
        imageDialogShow: false
      })
    } else if (type == 1) {
      wx.navigateTo({
        url: '../imageDownload/imageDownload',
      })
      this.setData({
        imageDialogShow: false
      })
    }
  },

  //打开psd窗口
  psdDialogOpen() {
    this.setData({
      psdDialogShow: true
    })
  },

  //点击psd窗口内的按钮
  psdButtonTap(e) {
    var type = e.detail.item.value
    if (type == 0) {
      wx.navigateTo({
        url: '../psd/psd',
      })
      this.setData({
        psdDialogShow: false
      })
    } else if (type == 1) {
      wx.navigateTo({
        url: '../psdDownload/psdDownload',
      })
      this.setData({
        psdDialogShow: false
      })
    }
  },

  closeScreen(){
    wx.showTabBar()
    wx.switchTab({
      url: '../index/index',
    })
  },

  //获取用户信息
  getUserInfo() {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.showTabBar()
          wx.getUserInfo({
            success: function (res) {
              wx.showTabBar()
              // 用户已经授权过,不需要显示授权页面,所以不需要改变isHide 的值
              // 用户授权成功后,调用微信的wx.login接口,从而获取code
              wx.login({
                success: res => {
                  // 获取到用户的 code 之后：res.code
                  console.log("用户的code:" + res.code);
                  // 传给后台，再经过解析获取用户的 openid
                  that.getOpenid()
                }
              });
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          wx.hideTabBar()
          that.setData({
            isHide: true
          });
        }
      }
    });
  },

  //确认是否授权
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      wx.showTabBar()
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      //授权成功后,通过改变isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false,
        thisUserInfo: e.detail.userInfo
      });
      app.globalData.userInfo = this.data.thisUserInfo
      console.log('userInfo', app.globalData.userInfo)
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入文件管理功能，请登录之后再进入!',
        cancelText:'确定',
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
          else if(res.cancel){
            console.log('用户点击了“返回首页”')
            wx.showTabBar()
            wx.switchTab({
              url: '../index/index'
            })
            wx.showTabBar()
          }
        }
      });
    }
  },

  //通过云函数获取用户的openid
  getOpenid() {
    let that = this;
    wx.cloud.callFunction({
     name: 'getOpenid',
     complete: res => {
      console.log('云函数获取到的openid: ', res.result.openid)
      that.setData({
       openid: res.result.openid
      })
     }
    })
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
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
    this.getUserInfo()
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