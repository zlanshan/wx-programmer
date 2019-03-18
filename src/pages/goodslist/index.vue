<template>
  <view> 
{{keyword}}
</view>

</template>

<script>
import Search from '../../components/search';
import request from '../../utils/request.js'
export default {
data(){
  return {
    keyword:'',
    tabIndex:0
  }
},

onLoad(name){
// console.log(name);
this.keyword=name.keyword;
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
.nav_right_title{
text-align: center;
font-size: 36rpx;
padding: 30rpx 0;
}
.nav_right_title::before,
.nav_right_title::after{
  content:'/';
  margin:0 20rpx;
  color:#999;
}
/* 这是设置标题图片的 */
.nav_right_title image{
 width: 500rpx;
 height: 200rpx;
}

.nav_right_content{
  display: flex;
  flex-wrap: wrap;
  /* 这里若是设置了排列方式的，若一行的数据不够的话也会按这个排列方式排列的，不美观，直接设置默认的从头开始的 */
  /* justify-content: space-around; */
  
}
.nav_right_content .subItem{
  /* 图片少用百分比，多用定宽高，分区可以用百分比 */
  width:33.3%;
  display: flex;
  font-size: 30rpx;
  padding:20rpx 0;
  flex-direction: column;
  /* justify-content: start; */
  justify-content: space-between;
  align-items: center;
}
.nav_right_content .subItem image{
  width:120rpx;
  height:120rpx;
}
</style>
