// miniprogram/pages/excelDownload/excelDownload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    excelFileIDList: [],
    tempExcelFileIDList: [],//保存excelFileIDList的临时变量
    excelFileNameList: [],//保存excelFileIDList中的excelFileName的列表
    tempSearchResultList: [],//保存匹配的搜索结果
    focusCount: 1,//聚焦次数
  },

  //获取excel的fileID集合
  async getExcelFileIDList() {
    var _this = this
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getFileIDList',
      // 传给云函数的参数
      data: {
        FileIDList: "excelFileIDList"
      },
    })
      .then(res => {
        _this.setData({
          excelFileIDList: res.result.data
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

  //长按，是否下载该excel
  async isDownloadExcel(e) {
    var _this = this
    var index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '确定要下载此Excel吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          _this.saveExcel(index)
        } else if (res.cancel) {
          console.log('点击取消了')
        }
      }
    })
  },

  //保存下载的excel
  async saveExcel(index) {
    var excelFileID = this.data.excelFileIDList[index].excelFileID
    var excelFileName = this.data.excelFileIDList[index].excelFileName
    console.log(excelFileID, excelFileName)
    wx.cloud.downloadFile({
      fileID: excelFileID, // 文件 ID
      success: res => {
        // 返回临时文件路径
        console.log(res.tempFilePath)
        const fs = wx.getFileSystemManager()
        fs.saveFile({
          tempFilePath: res.tempFilePath,
          filePath: wx.env.USER_DATA_PATH + '/' + excelFileName,
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

  //当搜索框第一次聚焦时，获取excelFileIDList中的excelFileName，保存为列表
  async getExcelFileNameList() {
    if (this.data.focusCount == 1) {
      var temp = this.data.excelFileIDList
      var length = temp.length
      for (var i = 0; i < length; i++) {
        this.setData({
          excelFileNameList: this.data.excelFileNameList.concat(temp[i].excelFileName),
          focusCount: 0
        })
      }
      console.log(this.data.excelFileNameList)
    }
  },

  //搜索框输入的value
  searchInput(e) {
    //输入框的值
    var value = e.detail.value

    //若不是第一次搜索，则更新为原excelFileIDList
    if (this.data.tempExcelFileIDList.length != 0) {
      this.setData({
        excelFileIDList: this.data.tempExcelFileIDList
      })
      //搜索框为空时，显示全部文件，不为空时，则搜索
      if (value != ""){
        this.search(value)
      }
    }
    else{
      //搜索框为空时，显示全部文件，不为空时，则搜索
      if (value != ""){
        this.search(value)
      }
    }
  },

  //搜索
  search(value) {
    var inputValue = value
    var temp = this.data.excelFileNameList
    var length = this.data.excelFileNameList.length
    for (var i = 0; i < length; i++) {
      //若文件名有匹配的，则更新tempSearchResultList
      if (temp[i].indexOf(inputValue) != -1) {
        this.setData({
          tempSearchResultList: this.data.tempSearchResultList.concat(this.data.excelFileIDList[i])
        })
      }
    }

    //若tempSearchResultList不为空，则显示搜索结果
    if (this.data.tempSearchResultList.length != 0) {
      this.setData({
        tempExcelFileIDList: this.data.excelFileIDList,//保存原excelFileIDList
        excelFileIDList: this.data.tempSearchResultList,//更新excelFileIDList
        tempSearchResultList: []//清空
      })
    }

    //若tempSearchResultList为空，则显示为空
    else{
      this.setData({
        excelFileIDList:[],
      })
    }
  },

  //重置
  reset() {
    this.setData({
      focusCount: 1,
      excelFileNameList: []
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getExcelFileIDList()//加载excelFileIDList
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