<template>
  <view> 
    <!-- 搜索框 -->
    <search></search>
  
  <!-- 导航栏 -->
  <view class="nav">
  <!-- 左侧的导航栏 -->
  <view class="nav_left">
      <view class='active'>大家电</view>
      <view>大家电</view>
      <view>大家电</view>
      <view>大家电</view>
      <view>大家电</view>
      <view>大家电</view>
      <view>大家电</view>
      <view>大家电</view>
      <view>大家电</view>
      <view>大家电</view>
      <view>大家电</view>
      <view>大家电</view>
      <view>大家电</view>
      <view>大家电</view>
      <view>大家电</view>
      <view>大家电</view>
      <view>大家电</view>
      <view>大家电</view>
      <view>大家电</view>
      <view>大家电</view>
      <view>大家电</view>
  </view>
  <view class="nav_right">
     <view class="nav_right_title">
       <image mode="aspectfill" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3240052967,3443336204&fm=27&gp=0.jpg"></image>
       <view>电视</view>
    </view>
     <view class="nav_right_content">
       <view class='item'>
       <image mode="aspectfill" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3240052967,3443336204&fm=27&gp=0.jpg"></image>
       <view>电视</view>
       </view>
         <view class='item'>
       <image mode="aspectfill" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3240052967,3443336204&fm=27&gp=0.jpg"></image>
       <view>电视</view>
       </view>
         <view class='item'>
       <image mode="aspectfill" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3240052967,3443336204&fm=27&gp=0.jpg"></image>
       <view>电视</view>
       </view>
         <view>
       <image mode="aspectfill" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3240052967,3443336204&fm=27&gp=0.jpg"></image>
       <view>电视</view>
       </view>
    </view>
  </view>
 
  <!-- 右侧的导航栏 -->
 </view>
</view>

</template>

<script>
import Search from '../../components/search'
export default {
data(){
  return {
    imgUrls:[],
    cateitems:[],
    flag:false,
    floor:[],
    product_list:[{}]
  }
},
components:{
Search
},
onLoad(){

}
}
</script>

<style>

.nav{
  margin-top:20rpx;
  /* height: 100%; */
  display: flex;
  /* 固定定位后左右两边的能够单独滚动的 */
  position: fixed;
  left:0;
  right:0;
  top:100rpx;
  bottom:0;

}
.nav_left{
 width:160rpx;
 text-align: center;
 overflow: scroll;
}
.nav_left >view{
  padding: 20rpx;
}
.nav_right{
  flex:1;
  padding:0 10rpx;
 overflow: scroll;

}
.nav_right_title image{
 width:500rpx;
 height: 200rpx;
}
.active{
  border-left:6rpx solid #eb4450;
  color:#eb4450;
}
.nav_right_content{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.nav_right_content .item{
  width:33%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.nav_right_content .item image{
  width:140rpx;
  height:80rpx;
}
</style>
