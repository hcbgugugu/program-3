const app = getApp();
var util=require('../../utils/util.js')
Page({
    data: {
        item:[],
        number:0,
        single:{
            title:'',
            detail:'',
        },
        inputtitle:'',
        inputdetail:'',
    },
    //创建便签
    tosubmit(e){
        var that=this
        that.setData({[`item[${that.data.item.length}]`]: {
            title:e.detail.value.title,
            detail:e.detail.value.detail,
            id: Date.now(),
            completed: false,
            createTime: util.formatTime(new Date()),
            completedTime: null,
          },
          inputtitle: '',
          inputdetail:'',
          number:this.data.item.length+1,
        }, () => {
          app.globalData.item = that.data.item
          app.globalData.number=that.data.number
          try {
            wx.setStorageSync('item', app.globalData.item)
            wx.setStorageSync('number', app.globalData.number)
          } catch (e) { }
        })
    },
    //点击进入详情页
    toProductDetail(e){
        var index=e.currentTarget.dataset.index
            var item=JSON.stringify(this.data.item)
            wx.navigateTo({
            url: '/pages/detail/index?item='+item+'&index='+index,
            })
    },
    onShow(){
        var that=this//备用
        this.setData({
            item:app.globalData.item
            
        })//获取全局数据
    },
    // 监听用户滑动页面事件。
    onPageScroll(e) {
        // 注意：请只在需要的时候才在 page 中定义此方法，不要定义空方法。以减少不必要的事件派发对渲染层-逻辑层通信的影响。
        // 注意：请避免在 onPageScroll 中过于频繁的执行 setData 等引起逻辑层-渲染层通信的操作。尤其是每次传输大量数据，会影响通信耗时。
        // https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onPageScroll-Object-object  
    },
})
