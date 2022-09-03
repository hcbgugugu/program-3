const app = getApp();
var util=require('../../utils/util.js')
Page({
    data: {
        item:[],
        single:{
            title:'',
            detail:'',
        },
        inputtitle:'',
        inputdetail:'',
    },
    //长按删除便签-----未完成
    delete(e){
        var index=e.currentTarget.dataset.index
        //_UTIL.arrRemoveObj(item,item[index])
        console.log('xxxxxxx')
        var that=this
        wx.showModal({
            title: '确认删除？',
            confirmColor: 'red',
            success(res) {
              if (res.confirm) {
                if (index === -1) {
                  console.error(`id ${id} 不存在`)
                  return
                }
                that.data.item.splice(index,1)
                var item=that.data.item
                var number=that.data.item.length
                that.setData({
                    item,
                    number,
                }, () => {
                    console.log(that.data.item)
                    app.globalData.item=that.data.item
                    wx.setStorageSync('item', that.data.item)
                    wx.setStorageSync('number', that.data.number)
                })
              }
            }
          })
    },
    //长按删除便签------已完成
    delete1(e){
        var index=e.currentTarget.dataset.index
        console.log('delete a diditem~')
        var that=this
        wx.showModal({
            title: '确认删除？',
            confirmColor: 'red',
            success(res) {
              if (res.confirm) {
                if (index === -1) {
                  console.error(`id ${id} 不存在`)
                  return
                }
                that.data.diditem.splice(index,1)
                var diditem=that.data.diditem
                var num=that.data.diditem.length
                that.setData({
                    diditem,
                    num,
                }, () => {
                    console.log(that.data.diditem)
                    app.globalData.diditem=that.data.diditem
                    wx.setStorageSync('diditem', that.data.diditem)
                    wx.setStorageSync('num', that.data.num)
                })
              }
            }
          })
    },
    //修改状态-----未完成=>已完成
    radioChange(e){
        var index=e.currentTarget.dataset.index//数组元素对应下标值
        var moved=this.data.item.splice(index,1)
        moved[0].completedTime=util.formatTime(new Date())
        console.log('moved:',moved)
        console.log('value:',moved[0])
        //this.data.item.concat(moved)
        this.data.diditem.push(moved[0])//注意如果没有写[0]的话新数组里会还有一个数组
        console.log('diditem:',this.data.diditem)
        this.setData({
            item:this.data.item,
            diditem:this.data.diditem,
            number:this.data.item.length,
            num:this.data.diditem.length,
        },()=>{
            app.globalData.item=this.data.item
            app.globalData.diditem=this.data.diditem
            app.globalData.number=this.data.number
            app.globalData.num=this.data.num
            wx.setStorageSync('item', this.data.item)
            wx.setStorageSync('diditem',this.data.diditem)
            wx.setStorageSync('num', this.data.num)
            wx.setStorageSync('number', this.data.number)
        })
    },
    //-----已完成=>未完成
    radioChange1(e){
        var index=e.currentTarget.dataset.index//数组元素对应下标值
        var moved=this.data.diditem.splice(index,1)
        console.log('moved:',moved)
        //this.data.item.concat(moved)
        this.data.item.push(moved[0])
        console.log('item:',this.data.item)
        this.setData({
            item:this.data.item,
            diditem:this.data.diditem,
            number:this.data.item.length,
            num:this.data.diditem.length,
        },()=>{
            app.globalData.item=this.data.item
            app.globalData.diditem=this.data.diditem
            app.globalData.number=this.data.number
            app.globalData.num=this.data.num
            wx.setStorageSync('item', this.data.item)
            wx.setStorageSync('diditem',this.data.diditem)
            wx.setStorageSync('num', this.data.num)
            wx.setStorageSync('number', this.data.number)
        })
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
        })
    },
    //点击进入详情页-----未完成
    toProductDetail(e){
        var index=e.currentTarget.dataset.index
        var item=JSON.stringify(this.data.item)
        wx.navigateTo({
            url: '/pages/detail/index?item='+item+'&index='+index,
        })
    },
    //-----已完成
    toProductDetail1(e){
        var index=e.currentTarget.dataset.index
        var diditem=JSON.stringify(this.data.diditem)
        wx.navigateTo({
            url: '/pages/detail1/index?diditem='+diditem+'&index='+index,
        })
    },
    onShow(){
        var that=this//备用
        this.setData({
            item:app.globalData.item,
            number:app.globalData.number,
            diditem:app.globalData.diditem,
            num:app.globalData.num,
        })//获取全局数据
    },
    onHide(){//小程序转到后台时自动缓存
        try {
            wx.setStorageSync('item', app.globalData.item)
            wx.setStorageSync('diditem', app.globalData.diditem)
            wx.setStorageSync('num', app.globalData.num)
            wx.setStorageSync('number', app.globalData.number)
          } catch (e) { }
    },
    // 监听用户滑动页面事件。
    onPageScroll(e) {
        // 注意：请只在需要的时候才在 page 中定义此方法，不要定义空方法。以减少不必要的事件派发对渲染层-逻辑层通信的影响。
        // 注意：请避免在 onPageScroll 中过于频繁的执行 setData 等引起逻辑层-渲染层通信的操作。尤其是每次传输大量数据，会影响通信耗时。
        // https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onPageScroll-Object-object  
    },
})
