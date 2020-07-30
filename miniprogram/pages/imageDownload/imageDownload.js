// miniprogram/pages/imageDownload/imageDownload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageFileIDList: []
  },

  //获取照片的fileID集合
  getImageFileIDList() {
    var _this = this
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getFileIDList',
      // 传给云函数的参数
      data: {
        FileIDList: "imageFileIDList"
      },
    })
      .then(res => {
        _this.setData({
          imageFileIDList: res.result.data
        })
        console.log(_this.data.wordFileIDList)
      })
      .catch(res => {
        if (console.error.length > 0) {
          wx.showToast({
            icon: 'none',
            title: '服务器繁忙',
          })
        }
      })
  },

  //是否下载该图片
  async isDownloadImage(e) {
    var _this=this
    var index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '确定要下载此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          //手机授权
          wx.getSetting({
            success(res) {
              if (!res.authSetting['scope.writePhotosAlbum']) {
                wx.authorize({
                  scope: 'scope.writePhotosAlbum',
                  success() {
                    console.log('授权成功')
                    _this.saveImage(index)
                  },
                  fail() {
                    console.log('授权失败')
                  }
                })
              } else if (res.authSetting['scope.writePhotosAlbum']) {
                saveImage(index)
              }
            }
          })
        } else if (res.cancel) {
          console.log('点击取消了')
        }
      }
    })
  },

  //保存下载的照片
  async saveImage(index) {
    var imageFileID = this.data.imageFileIDList[index].imageFileID
    console.log(imageFileID)
    wx.cloud.downloadFile({
      fileID: imageFileID, // 文件 ID
      success: res => {
        // 返回临时文件路径
        console.log(res.tempFilePath)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: res => {
            wx.showToast({
              title: '下载成功',
            })
          },
          fail:res => {
            wx.showToast({
              title: '下载失败',
            })
          },
        })
      },
      fail:res => {
        wx.showToast({
          title: '下载失败',
        })
      },
    })
  },


/**
 * 生命周期函数--监听页面加载
 */
onLoad: function (options) {
  this.getImageFileIDList()
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