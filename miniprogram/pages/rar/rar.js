// miniprogram/pages/rar/rar.js
Page({

  //选择rar
  chooseRar() {
    if (this.data.rarCount == 0) {
      wx.showToast({
        icon: "none",
        title: '最多只能添加9个rar！',
      })
    } else {
      wx.chooseMessageFile({
        type: 'file',
        count: this.data.rarCount,
        success: (result) => {
          this.setData({
            srcList: this.data.srcList.concat(result.tempFiles),
            rarCount: this.data.rarCount - result.tempFiles.length,
          })
          console.log(this.data.srcList)
        },
      })
    }
  },

  //是否删除该rar
  isDeleteRar(e) {
    var _this = this
    var index = e.currentTarget.dataset.index;
    var srcList = this.data.srcList;
    wx.showModal({
      title: '提示',
      content: '确定要删除此rar吗？',
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

  //上传
  upload(e) {
    if (!this.data.srcList.length) {
      wx.showToast({
        icon: 'none',
        title: '文档内容为空！'
      });
    } else {
      //上传rar到云存储
      wx.showLoading({
        title: '上传中',
      })
      let promiseArr = []
      const db = wx.cloud.database()
      for (let i = 0; i < this.data.srcList.length; i++) {
        promiseArr.push(new Promise((reslove, reject) => {
          var item = this.data.srcList[i];
          var fileExtension = item.name.substring(item.name.lastIndexOf('.') + 1);//正则表达式返回文件的扩展名 
          console.log(fileExtension)
          if (fileExtension == 'rar' || fileExtension == 'zip' ||fileExtension == '7z'|| fileExtension == 'CAB' || fileExtension == 'ARJ' || fileExtension == 'LZH' ||fileExtension == 'TAR'||fileExtension == 'GZ' || fileExtension == 'ACE' ||fileExtension == 'UUE'|| fileExtension == 'BZ2' || fileExtension == 'JAR' || fileExtension == 'ISO' ||fileExtension == 'MPQ') {
            console.log(item.name)
            wx.cloud.uploadFile({
              cloudPath: "rar/" + (item.name), // 上传至云端的路径
              filePath: item.path, // 小程序临时文件路径
              success: res => {
                console.log(res)
                this.setData({
                  fileIDs: this.data.fileIDs.concat(res.fileID)
                });
                //将添加的rar的fileID保存为一个集合，放在数据库中
                db.collection('rarFileIDList').add({
                  data: {
                    rarFileName: item.name,
                    rarFileID: res.fileID
                  },
                  success(res) {
                    console.log("success", res)
                  },
                  fail(res) {
                    console.log(res)
                  }
                })
                console.log(res.fileID) //输出上传后rar的返回地址
                reslove();
                wx.hideLoading();
                wx.showToast({
                  title: "上传成功",
                })
              },
              fail: res => {
                wx.hideLoading();
                wx.showToast({
                  icon:'none',
                  title: "上传失败",
                })
              }
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: "rar文档格式有错误！",
            })
          }
        }));
      }

      Promise.all(promiseArr).then(res => { //等数组都做完后做then方法
        console.log("rar上传完成后再执行")
        this.setData({
          srcList: []
        })
      })
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    fileIDs: [], //上传云存储后的返回值
    srcList: [], //上传云存储时的本地路径
    rarCount: 9, //最大上传rar数量
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