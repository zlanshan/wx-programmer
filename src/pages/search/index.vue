<template>
  <view>
    <!-- 搜索框 -->
    <view class="search">
      <view class="search-input">
        <icon type="search" size="40rpx"></icon>
         <input type="text" placeholder="请输入你想要的商品"/>
      </view>
      <button
        size="mini"
        type="defult"
        class="cancel"
        v-show="false"
        >
        取消
      </button>
    </view>

    <!-- 历史搜索 -->
    <view class="history-title">
      <text>历史搜索</text>
      <icon
        type="clear"
        size="34rpx">
      </icon>
    </view>
    <!-- 历史列表 -->
    <view class="history-list">
      <block v-for="(item,index) in [13,2,3,5]" :key="index">
        <view class="history-list-item">
         {{item}}
        </view>
      </block>
    </view>

    <!-- 搜索提示 -->
    <view class="search-tips">
      <block v-for="(item,index) in [1,3,4,6,83,23]" :key="index">
      <view class="search-tips-item">
         {{item}}
      </view>
      </block>
    </view>
  </view>
</template>

<script>
export default {

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
