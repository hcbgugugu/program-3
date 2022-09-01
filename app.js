import { colorUI } from './config/ColorUI'
import { colorUISdk } from './config/mp-sdk'

App({
    colorUI,//挂载到app上
    colorUISdk,
    globalData:{
        item:[],
        number:0,
    },
    onLaunch() {
        var that=this//备用
        try {
            var value = wx.getStorageSync('item')
            var number=wx.getStorageSync('number')
            console.log('reading storage:',value)
            if (value) {
                this.globalData.item=value
                this.globalData.number=number
            }
          } catch (e) {
            console.log('读取缓存失败:',e)
          }
    },
    onShow() {
        
    }
})
