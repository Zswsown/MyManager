// miniprogram/pptDownload/pptDownload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pptFileIDList: [],
    tempPptFileIDList: [],//保存pptFileIDList的临时变量
    pptFileNameList: [],//保存pptFileIDList中的pptFileName的列表
    tempSearchResultList: [],//保存匹配的搜索结果
    focusCount: 1,//聚焦次数
  },

  //获取ppt的fileID集合
  async getPptFileIDList() {
    var _this = this
    /* const db = wx.cloud.database()
    db.collection('pptFileIDList').get().then(res => {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      _this.setData({
        pptFileIDList: res.data
      })
      console.log(this.data.pptFileIDList)
    }) */
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getFileIDList',
      // 传给云函数的参数
      data: {
        FileIDList: "pptFileIDList"
      },
    })
      .then(res => {
        _this.setData({
          pptFileIDList: res.result.data
        })
        console.log(_this.data.pptFileIDList)
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

  //长按，是否下载该ppt
  async isDownloadPpt(e) {
    var _this = this
    var index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '确定要下载此Ppt吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          _this.savePpt(index)
        } else if (res.cancel) {
          console.log('点击取消了')
        }
      }
    })
  },

  //保存下载的ppt
  async savePpt(index) {
    var pptFileID = this.data.pptFileIDList[index].pptFileID
    var pptFileName = this.data.pptFileIDList[index].pptFileName
    console.log(pptFileID, pptFileName)
    wx.cloud.downloadFile({
      fileID: pptFileID, // 文件 ID
      success: res => {
        // 返回临时文件路径
        console.log(res.tempFilePath)
        const fs = wx.getFileSystemManager()
        fs.saveFile({
          tempFilePath: res.tempFilePath,
          filePath: wx.env.USER_DATA_PATH + '/' + pptFileName,
          success(res) {
            wx.showToast({
              title: '下载成功！',
            })
            console.log(res)
            console.log(res.savedFilePath)

            // 打开文件
            wx.openDocument({
              filePath: res.savedFilePath,
              success: function (res) {
                console.log('打开文档成功')
              },
            })
          },
        })
      },
      fail: res => {
        wx.showToast({
          icon: 'none',
          title: '下载失败',
        })
      },
    })
  },

  //当搜索框第一次聚焦时，获取pptFileIDList中的pptFileName，保存为列表
  async getPptFileNameList() {
    if (this.data.focusCount == 1) {
      var temp = this.data.pptFileIDList
      var length = temp.length
      for (var i = 0; i < length; i++) {
        this.setData({
          pptFileNameList: this.data.pptFileNameList.concat(temp[i].pptFileName),
          focusCount: 0
        })
      }
      console.log(this.data.pptFileNameList)
    }
  },

  //搜索框输入的value
  searchInput(e) {
    //输入框的值
    var value = e.detail.value

    //若不是第一次搜索，则更新为原pptFileIDList
    if (this.data.tempPptFileIDList.length != 0) {
      this.setData({
        pptFileIDList: this.data.tempPptFileIDList
      })
      //搜索框为空时，显示全部文件，不为空时，则搜索
      if (value != "") {
        this.search(value)
      }
    }
    else {
      //搜索框为空时，显示全部文件，不为空时，则搜索
      if (value != "") {
        this.search(value)
      }
    }
  },

  //搜索
  search(value) {
    var inputValue = value
    var temp = this.data.pptFileNameList
    var length = this.data.pptFileNameList.length
    for (var i = 0; i < length; i++) {
      //若文件名有匹配的，则更新tempSearchResultList
      if (temp[i].indexOf(inputValue) != -1) {
        this.setData({
          tempSearchResultList: this.data.tempSearchResultList.concat(this.data.pptFileIDList[i])
        })
      }
    }

    //若tempSearchResultList不为空，则显示搜索结果
    if (this.data.tempSearchResultList.length != 0) {
      this.setData({
        tempPptFileIDList: this.data.pptFileIDList,//保存原pptFileIDList
        pptFileIDList: this.data.tempSearchResultList,//更新pptFileIDList
        tempSearchResultList: []//清空
      })
    }

    //若tempSearchResultList为空，则显示为空
    else {
      this.setData({
        pptFileIDList: [],
      })
    }
  },

  //重置
  reset() {
    this.setData({
      focusCount: 1,
      pptFileNameList: []
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPptFileIDList()//加载pptFileIDList
    this.reset()//重置
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