<template>
  <view>
    <view class="search">
      <view class="search-input">
        <icon type="search" size="40rpx"></icon>
      </view>
      <view type="button"></view>
    </view>
  </view>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.search {
  background-color: #eee;
  // height: 100rpx;
  padding: 30rpx 20rpx;
  .search-input {
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
}
</style>
