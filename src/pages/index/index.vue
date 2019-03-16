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

<!-- 分类 -->
<view class="shop-classify">
  <block v-for="(item,index) in cateitems" :key="index">
  <image :src="item.image_src"></image>
  </block>


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
 wx.request({
  method:"get",
  url:"https://www.zhengzhicheng.cn/api/public/v1/home/catitems",
  success:res=>{
  //  console.log(res);
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
.shop-swiper image{
width:750rpx;
height: 340rpx;
}

/* 分类 */
.shop-classify{
  display: flex;
  justify-content: space-around;
  padding:10rpx;
  /* align-items: center; */
}
.shop-classify image{
  /* flex:1; */
  width:128rpx;
  height: 140rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
