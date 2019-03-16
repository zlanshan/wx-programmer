<template>
  <view> 
    <!-- 搜索框 -->
  <view class='search'>
    <view class='search-in'>
      <!-- 搜索图标 -->
      <icon type='search' class='search-icon' size='16'></icon>
      搜索
    </view>
  </view>
  
  <!-- 轮播图 -->
  <swiper
  indicator-dots="true"
  autoplay="true"
  interval=3000
  duration=1000
  indicator-color="rgba(255,255,255,.3)"
  indicator-active-color="rgba(255,255,255,1)"
  circular
>
  <block v-for="(item,index) in imgUrls" :key="index">
    <swiper-item class='shop-swiper'>
      <image :src="item.image_src" class="slide-image" width="355" height="150"></image>
    </swiper-item>
  </block>
</swiper>

<!-- 分类的选项数据 -->
<view class="shop-classify">
  <block v-for="(item,index) in cateitems" :key="index">
  <image :src="item.image_src" mode="aspectfill"></image>
  </block>
</view>
<!-- 楼层数据-->
<view class='floor'>
<view class="floor_title">
  <image mode="aspectfill" src="https://lg-igjc8p1o-1256763078.cos.ap-shanghai.myqcloud.com/upload/pic_floor01_title.png"></image>
</view>
<view class="floor_content">
  <view class="floor_content_left">
  <image mode="aspectfill" src="https://lg-igjc8p1o-1256763078.cos.ap-shanghai.myqcloud.com/upload/pic_floor01_1@2x.png"></image>
  </view>
  <view class="floor_content_right">
     <image mode="aspectfill" src="https://lg-igjc8p1o-1256763078.cos.ap-shanghai.myqcloud.com/upload/pic_floor01_2@2x.png"></image>
    <image mode="aspectfill" src="https://lg-igjc8p1o-1256763078.cos.ap-shanghai.myqcloud.com/upload/pic_floor01_3@2x.png"></image>
    <image mode="aspectfill" src="https://lg-igjc8p1o-1256763078.cos.ap-shanghai.myqcloud.com/upload/pic_floor01_4@2x.png"></image>
    <image mode="aspectfill" src="https://lg-igjc8p1o-1256763078.cos.ap-shanghai.myqcloud.com/upload/pic_floor01_5@2x.png"></image>
  </view>
</view>
</view>

</view>

</template>

<script>
export default {
data(){
  return {
    imgUrls:[],
    cateitems:[]
  }
},
onLoad(){
  // 轮播图的请求
  wx.request({
  method:"get",
  url:"https://www.zhengzhicheng.cn/api/public/v1/home/swiperdata",
  success:res=>{
  //  console.log(res);
  if(res.data.meta.status==200){
  this.imgUrls=res.data.message;
  }
 }
}),
  // 分类的选项数据
 wx.request({
  method:"get",
  url:"https://www.zhengzhicheng.cn/api/public/v1/home/catitems",
  success:res=>{
  //  console.log(res);
  // 在页面为匹配完之前是否有图片对象的数据不完整，，name和navaigator_url的
  if(res.data.meta.status==200){
  this.cateitems=res.data.message;
  }
 }
})
}
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
/* 轮播图 */
/* 轮播图有自己的高度。需要更改的他的高度，以防图片失真，缩放等 */
swiper{
  height: 340rpx;
}
.shop-swiper image{
width:750rpx;
height: 340rpx;
}

/* 分类 */
.shop-classify{
  display: flex;
  justify-content: space-around;
  padding:20rpx 0 30rpx 0;
  /* align-items: center; */
}
.shop-classify image{
  /* flex:1; */
  /* 固定图片的宽高 */
  width:128rpx;
  height: 140rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 楼层 */
.floor_title {
  padding:30rpx 0 10rpx 0;
  background-color: #f4f4f4;
}
.floor_title image{
  width:750rpx;
  height: 59rpx;
}

.floor_content {
  /* 楼层内的图片是弹性布局，padding是设置内边距 */
display: flex;
padding:20rpx;
}
/* 左边一张大图的设置，，固定宽高 */
.floor_content_left image{
width:232rpx;
height: 386rpx;
}
/* 右边四张图固定宽高，且有外边距的 */
.floor_content_right image{
  width:233rpx;
  height: 188rpx;
  margin-left:10rpx;
  /* margin-bottom:20rpx; */
}
</style>
