// miniprogram/pages/image/image.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileIDs: [], //上传云存储后的返回值
    srcList: [], //上传云存储时的本地路径
    imageCount: 9, //最大上传照片数量
  },

  //选择照片
  chooseImage() {
    if (this.data.imageCount == 0) {
      wx.showToast({
        icon: "none",
        title: '最多只能添加9张图片！',
      })
    } else {
      wx.chooseImage({
        complete: (res) => {},
        count: this.data.imageCount,
        fail: (res) => {},
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (result) => {
          this.setData({
            srcList: this.data.srcList.concat(result.tempFilePaths),
            imageCount: this.data.imageCount - result.tempFilePaths.length,
          })
        },
      })
    }
  },

  //上传
  upload(e) {
    if (!this.data.srcList.length) {
      wx.showToast({
        icon: 'none',
        title: '图片内容为空！'
      });
    } else {
      //上传图片到云存储
      wx.showLoading({
        title: '上传中',
      })
      let promiseArr = []
      const db = wx.cloud.database()
      for (let i = 0; i < this.data.srcList.length; i++) {
        promiseArr.push(new Promise((reslove, reject) => {
          let item = this.data.srcList[i];
          let suffix = /\.\w+$/.exec(item)[0]; //正则表达式返回文件的扩展名
          wx.cloud.uploadFile({
            cloudPath: "image/" + (new Date().getTime() + suffix), // 上传至云端的路径
            filePath: item, // 小程序临时文件路径
            success: res => {
              this.setData({
                fileIDs: this.data.fileIDs.concat(res.fileID)
              });
              //将添加的图片的fileID保存为一个集合，放在数据库中
              db.collection('imageFileIDList').add({
                data: {
                  imageFileID:res.fileID
                },
                success(res) {
                  console.log("success", res)
                },
                fail(res) {
                  console.log(res)
                }
              })
              console.log(res.fileID) //输出上传后图片的返回地址
              reslove();
              wx.hideLoading();
              wx.showToast({
                title: "上传成功",
              })
            },
            fail: res => {
              wx.hideLoading();
              wx.showToast({
                title: "上传失败",
              })
            }
          })
        }));
      }

      Promise.all(promiseArr).then(res => { //等数组都做完后做then方法
        console.log("图片上传完成后再执行")
        this.setData({
          srcList: []
        })
      })
    }
  },

  //是否删除照片
  isDeleteImage(e) {
    var _this = this
    var index = e.currentTarget.dataset.index;
    var srcList = this.data.srcList;
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          srcList.splice(index, 1)
          _this.setData({
            srcList: srcList
          })
        } else if (res.cancel) {
          console.log('点击取消了')
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