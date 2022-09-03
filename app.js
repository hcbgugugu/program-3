import { colorUI } from './config/ColorUI'
import { colorUISdk } from './config/mp-sdk'

App({
    colorUI,//挂载到app上
    colorUISdk,
    globalData:{
        item:[],
        number:0,
        num:0,//已完成数
        diditem:[],//已完成
    },
    onLaunch() {
        var that=this//备用
        try {
            var value = wx.getStorageSync('item')
            var number=wx.getStorageSync('number')
            var num=wx.getStorageSync('num')
            var diditem=wx.getStorageSync('diditem')
            console.log('reading storage:',value)
            if (value) {
                this.globalData.item=value
                this.globalData.number=0
                this.globalData.num=0
                this.globalData.diditem=diditem
                if(number){
                    this.globalData.number=number
                }
                if(num){
                    this.globalData.num=num
                }
            }
          } catch (e) {
            console.log('读取缓存失败:',e)
          }
    },
    onShow() {
        
    }
})
