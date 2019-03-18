<template>
  <view> 
    <!-- 搜索框 -->
    <search></search>
  
  <!-- 导航栏 -->
  <view class="nav">
  <!-- 左侧的导航栏 scroll-view肯定要设置滚动的方向-->
  <scroll-view scroll-y class="nav_left">
    <block v-for="(item,index) in [1,3,5,5,3,34,2,23,4,1,3,5,5,3,34,2,23,4,1,3,5,5,3,34,2,23,4]" :key="index">
      <!-- "{active:'index===tabIndex'}" 这个方式是全选了？-->
      <!-- {active:index===tabIndex}对象的方式获取值？？ -->
      <view class="item" :class="{active:index===tabIndex}" @tap="tapItem(index)">大家电</view>
      </block>
  </scroll-view>


  <scroll-view scroll-y class="nav_right">
    <!-- 大标题 -->
     <block v-for="(subItem,subIndex) in [1,4,3,5,34,2,3,43,2,3]" :key="subIndex">
     <view class="nav_right_title">
       <image mode="aspectfill" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3240052967,3443336204&fm=27&gp=0.jpg"></image>
       <view>电视</view>
    </view>
     </block>
     <!-- 标题下的所有子项 -->
     <view class="nav_right_content">
       <block v-for="(subItem,subIndex) in [1,4,3,5,34,2,3,43,2,3]" :key="subIndex">
         <view class="subItem">
       <image mode="aspectfill" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3240052967,3443336204&fm=27&gp=0.jpg"></image>
       <view>电视</view>
       </view>
       </block>
    </view>
  </scroll-view>
 
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
    product_list:[{}],
    tabIndex:0
  }
},
methods:{
tapItem(index){
  this.tabIndex=index;
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
 width:200rpx;
 height: 100%;
 background-color: #f4f4f4;
 /* 防止左右的图片和文字相互挤压的 */
 flex-shrink: 0;
 /* overflow: scroll; */
}
.nav_left .item{
  /* padding: 20rpx; */
  font-size: 36rpx;
  border-bottom: 1rpx solid #ccc;
  text-align: center;
  /* 行高设置，相对的高度也已经设置了 */
  line-height: 100rpx;
  position: relative;

}
.nav_left .item.active{
  background-color: #fff;
  /* 这里设置边框的话会有挤压的现象 */
  /* border-left:6rpx solid #eb4450; */
  color:#eb4450;

}
.nav_left .item.active::before{
  background-color: #eb4450;
  content:'';
  clear:both;
  display: block;
  overflow: hidden;
  width:6rpx;
  position: absolute;
  /* 固定定位就会每个item都会加上边框而不仅仅是active点击状态的 */
  /* position: fixed; */
  left:0;
  top:20rpx;
  bottom:20rpx;
 

}
.nav_right{
  flex:1;
  padding:0 10rpx;
  /* 左右两侧的高度都设置为100%，滚动 */
  height: 100%;
  /* overflow: scroll; */

}
.nav_right_title image{
 width: 500rpx;
 height: 200rpx;
}

.nav_right_content{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  font-size: 30rpx;
  /* padding:20rpx; */
}
.nav_right_content .subItem{
  /* 图片少用百分比，多用定宽高，分区可以用百分比 */
  width:30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.nav_right_content .subItem image{
  width:140rpx;
  height:80rpx;
}
</style>
