<template>
      <!-- 搜索框 -->
  <navigator class='search'>
    <view class='search-in'>
      <!-- 搜索图标 -->
      <icon type='search' class='search-icon' size='16'></icon>
      搜索
    </view>
  </navigator>

</template>

<script>
export default {
 
}
</script>

<style>
.search{
  padding:20rpx;
  background-color: #eb4450;
}
.search-icon{
  margin-right: 10rpx;
  /* font-size:16rpx; */
}
.search-in{
 height:60rpx;
 background-color: #fff;
 color:#666;
 text-align: center;
 display: flex;
 justify-content: center;
 align-items: center;
}
</style>
