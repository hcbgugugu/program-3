// pages/detail/index.js
const app=getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {

    },
    //修改题目和备注
    modify(e){
        app.globalData.item[this.data.index].title=e.detail.value.title
        app.globalData.item[this.data.index].detail=e.detail.value.detail
        wx.navigateBack({
            delta: 1,
          })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var item=JSON.parse(options.item)
        var index=JSON.parse(options.index)
        console.log(item[index])
        this.setData({
            item:item[index],
            index:index,
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})