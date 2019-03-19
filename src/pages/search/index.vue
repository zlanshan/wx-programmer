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
         @confirm="inputSumbit"/>
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
        <view class="history-list-item">
          {{item}}
        </view>
      </block>
    </view>

    <!-- 搜索提示 -->
    <view class="search-tips" v-show="false">
      <block v-for="(item,index) in tips" :key="index">
      <view class="search-tips-item">
         {{item}}
      </view>
      </block>
    </view>
  </view>
</template>

<script>
export default {
    data(){
      return {
        keyword:'',
        inputVal:'',
        history:[],
        tips:''
      }
    },
    methods:{
       inputSumbit(){
        //  历史数据添加到前面
        // console.log(this.history)
         this.history.unshift(this.inputVal);
        //  将数据保存到本地存储中
         wx.setStorageSync('history',this.history);
        
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
