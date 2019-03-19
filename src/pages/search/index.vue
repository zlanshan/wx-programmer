<template>
  <view>
    <!-- 搜索框 -->
    <view class="search">
      <view class="search-input">
        <icon type="search" size="40rpx"></icon>
        <!-- value时动态变化的，这个是从商品列表页携带的数据，，v-model是键盘输入的实时变化数据 -->
         <input type="text" 
         placeholder="请输入你想要的商品" 
         :value="keyword"
         v-model="inputVal"
         @confirm="inputSumbit"
         @input="inputHandle"/>
      </view>
      <button
        size="mini"
        type="defult"
        class="cancel"
        v-show="inputVal.length>0"
        @tap="clearData"
        >
        取消
      </button>
    </view>

    <!-- 历史搜索 -->
    <view class="history-title" v-show="history.length>0 || 0">
      <text>历史搜索</text>
      <icon
        type="clear"
        size="34rpx"
        @tap="handleClear">
      </icon>
    </view>
    <!-- 历史列表 -->
    <view class="history-list">
      <!-- history.length>0 || 0 -->
      <block v-for="(item,index) in history" :key="index">
        <view class="history-list-item" @tap="gotoGoods(item,index)">
          {{item}}
        </view>
      </block>
    </view>

    <!-- 搜索提示 -->
    <view class="search-tips" v-show="tips.length>0 || 0">
      <block v-for="(item,index) in tips" :key="index">
      <view class="search-tips-item" @tap="gotoGoodsDetail(item.goods_id,item.goods_name)">
         {{item.goods_name}}
      </view>
      </block>
    </view>
  </view>
</template>

<script>
import {getQsearch} from '@/api/index.js';
export default {
    data(){
      return {
        keyword:'',
        inputVal:'',
        history:[],
        tips:[]
      }
    },
    methods:{
       // 输入框点击完成的事件处理函数
       inputSumbit(){
        //  历史数据添加到前面
        // console.log(this.history)
        if(this.inputVal==""){
          // 当点击完成时，没输入内容，其提示框自动隐藏
           this.tips=[];
        }else {
          // 这样判断后肯定只能是找到相同的一个的
          for(let i=0;i<this.history.length;i++){
            if(this.history[i]===this.inputVal){
              this.history.splice(i,1);
            }
          }
           this.history.unshift(this.inputVal);
           //  将数据保存到本地存储中
           wx.setStorageSync('history',this.history); 
        }
        
       },
      //  // 5.0 输入框输入内容的时候触发
      inputHandle(){
         // 5.0.1 根据输入框的内容发起请求，获取搜索提示列表
         getQsearch({query:this.inputVal}).then(res=>{
           if(res.data.meta.status===200){
             this.tips=res.data.message;
           }
         });
      },
      gotoGoodsDetail(id,name){
          // console.log(name);
          // 点击后该数据也应该进入历史记录中的，同时也要存入本地存储中
          this.history.unshift(name);
          wx.setStorageSync('history',this.history); 
          wx.navigateTo({ url: '/pages/goodsdetail/main?goods_id='+id });
          // 这是当再次返回此页面时开始其提示信息无
          this.tips=[];
      },
      // 点击历史记录能跳转到商品列表页
      gotoGoods(item,index){
        // 删除历史记录刚点击的数据，再到数组的前添加数据，并存储到本地内存中的
        this.history.splice(index,1);
        setTimeout(()=>{
        this.history.unshift(item);
        wx.setStorageSync('history',this.history); 
        },0)
        // 这个keyword对应这商品列表的地址栏的对象属性名：属性值
        wx.redirectTo({ url: '/pages/goodslist/main?keyword='+item });
      },
      //  处理清空历史记录
       handleClear(){
        //  设置当前的数组为空，后面开始也是调用空数组的
         this.history=[];    
        //  在清空本地存储的历史记录
         wx.clearStorage();
       },
      //  点击取消按钮清空数据
      clearData(){
        // 即这个inputval为空，亦是空字符串是没有长度的
         this.inputVal='';
        //  当点击取消按钮时其提示框也需隐藏
         this.tips=[];
      }    
      },
    // 页面隐藏和显示后能在此执行的
    onShow(){
      // 获取本地存储中的history历史记录值和第一次是没有历史记录的，如果不设置为空数组，后面history不是数组
       this.history=wx.getStorageSync('history') || [];
    },
    onLoad(query){
      this.keyword=query.keyword;
      // console.log(this.keyword);
    }
}
</script>

<style lang="scss">
.search {
  display: flex;
  background-color: #eee;
  // height: 100rpx;
  padding: 30rpx 20rpx;
  .search-input {
    flex:1;
    height: 64rpx;
    font-size: 32rpx;
    color:#666;
    background-color: #fff;
    // display:flex是实现盒子内的子项垂直居中显示
    display: flex;
    // justify-content: center;
    align-items:center;
    border-radius: 10rpx;
  }
  .search-input icon {
    margin-left: 30rpx;
    margin-right: 20rpx;
  }
  .cancel{
    margin-left:20rpx;
    width:160rpx;
    line-height: 64rpx;
    background-color: #eee;
    text-align: center;
    font-size: 32rpx;
    padding:0rpx 20rpx;
  }
}
// 历史分区
.history-title{
  padding:20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
// 历史列表
.history-list{
  padding:10rpx;
  .history-list-item{
    display: inline-block;
    padding: 0 20rpx;
    background-color: #eee;
    line-height: 2;
    margin:10rpx;
    // 这是设置子项的最大宽度值
    max-width: 300rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
// 搜索提示
.search-tips{
  position:fixed;
  left:0;
  right: 0;
  top:100rpx;
  bottom: 0;
  background-color: #eee;
  .search-tips-item{
    border-bottom: 1px solid #ccc;
    padding:20rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
