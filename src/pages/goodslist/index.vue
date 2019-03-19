<template>
  <view>
    <!-- 搜索框 -->
    <view class="search">
      <view class="search-input">
        <icon type="search" size="40rpx"></icon>
        {{keyword}}
      </view>
    </view>

    <!-- 综合的tab栏 -->
    <view class="tab">
      <block v-for="(item,index) in tabItem" :key="index">
        <view class="tab_item" :class="{active:index===tabIndex}" @tap="tabAll(index)">
            {{item}}
            <!-- 价格旁边的调整价格递增还是递减的排序的箭头 -->
            <!-- <view  v-if="index===3">{{tabIndex}}</view> -->
        </view>
      </block>
    </view>

    <!-- 商品搜索列表 -->
    <view>
      <block v-for="(item,index) in searchItem" :key="index">
    <view class="goods_item">
      <!-- 右边图片的 -->
      <view class="goods_item_left">
        <image mode="aspectfill" :src="item.goods_small_logo"></image>
      </view>
      <!-- 左边文字加价格 -->
       <view class="goods_item_right">
         <view class="goods_item_title">
           {{item.goods_name}}
         </view>
         <view class="goods_item_price">
           <span class="price">￥</span>{{item.goods_price}}
         </view>
       </view>
    </view>
    </block>
</view>
<!-- 下拉加载的 -->
 <view class="loading" v-show="!hasMore">我是有底线的....</view>

  </view>
</template>

<script>
import Search from "../../components/search";
import request from "../../utils/request.js";
import {getSearch} from "@/api/index.js"
export default {
  data() {
    return {
      // 关键词搜索
      keyword: "",
      tabItem:["综合","销量","价格"],
      // 导航栏的tabIndex判断激活的是哪个tabItem
      tabIndex: 0,
      // 搜索到的数据
      searchItem:[],
      hotNum:[1,3,5,3,7,2],
      // 当前页和煤业的数量
      pagenum:1,
      pagesize:20,
      // 设置我是有底线的显示与隐藏的布尔类型值
      hasMore:true
    }
  },
  onLoad(query) {
      // console.log(query);
      this.keyword = query.keyword;
      // getSearch({query:this.keyword});
      this.getData();
  },

// 页面触底事件，若还有数据，就继续加载，没有的话就显示我是有底线的
  onReachBottom(){
     // 页面触底的时候页调用获取数据的函数
    this.getData();
  },
  // 页面卸载时触发，如redirectTo或navigateBack到其他页面时
  onUnload(){
    //   初始化数据，防止小程序页面 data 数据的缓存
   this.initData();
  },
  // 监听用户下拉刷新事件
  onPullDownRefresh(){
    // 初始化页面数据
    this.initData();
    // 重新请求数据
    this.getData();
  },
  methods:{
    initData(){
      this.pagenum=1;
      // 重新初始化页面数据时，须将此值设置true，先不让其显示
      this.hasMore=true;
      this.searchItem=[];
    },
    // 封装获取数据的方法
    getData(){
      // 如果为真，就不执行请求数据
      if(!this.hasMore) return;  
      wx.showLoading({
        title: 'Loading...', //提示的内容,
        mask: true, //显示透明蒙层，防止触摸穿透,
      });
      // getSearch是封装好的统一管理的请求数据的，只需传参进去即可
       getSearch({
          query:this.keyword,
          pagenum:this.pagenum,
          pagesize:this.pagesize}).then(res=>{
            const {message,meta}=res.data;
            if(meta.status===200){
              // this.searchItem=message.goods;
              // 拼接数组并赋值，否则就不是hi个新的数组值
              this.searchItem=this.searchItem.concat(message.goods);
              // this.searchItem=[...this.searchItem,...goods];
              // 当前页的数据请求完后，若还有多余的数据，在此请求时即从第二页再开始，即页面数加一
              this.pagenum++;
              // 当请求回来的goods数据小于每一页应该请求回来的数据时，就表示没有多余的数据了，就设置我是有底线的
              if(message.goods.length<this.pagesize){
                this.hasMore=false;
              }
              wx.hideLoading();
               // 把下拉刷新动画页停止
            wx.stopPullDownRefresh();
            }
      })
    },
    tabAll(index){
      this.tabIndex=index;
      console.log(index);
      if(index===1){
        var hotNum=this.hotNum;
        var max=hotNum[0];
        var min=hotNum[0];
        // 还得再判断下到底是选择哪种排列顺序的
        getMax();
        //  从大到小排列
        function getMax() { 
          for(let i=0;i<hotNum.length;i++){
            for(let j=1;j<hotNum.length;j++){
              if(hotNum[i]<hotNum[j]){
              // hotNum[j]如果此值大就付给max，这种类似于变量交换
                max=hotNum[j];
              //  并将小的值再次赋值给hotNum[j],存放
                hotNum[j]=hotNum[i];
              //  最后将j和i的值相交换，最后还是拿比较hotNum[i]<hotNum[j]比较
                hotNum[i]=max;
              }
            }
          }
        console.log(hotNum);
      };
    
          //  从小到大排列
        function getMin() { 
            for(let i=0;i<hotNum.length;i++){
            for(let j=1;j<hotNum.length;j++){ 
              if(hotNum[i]>hotNum[j]){
              // hotNum[j]如果此值大就付给max，这种类似于变量交换
              min=hotNum[j];
              //  并将小的值再次赋值给hotNum[j],存放
              hotNum[j]=hotNum[i];
              //  最后将j和i的值相交换，最后还是拿比较hotNum[i]<hotNum[j]比较
              hotNum[i]=min;
            }
            }  
          }
          console.log(hotNum);
        };

          }else if(index===2){
            // 这是点击价格
          }
        }

    }
    
       //  自己封装的函数，参数写全，没有的会设置默认值，request请求和request.get()请求
      //  request.get("goods/search",{query:this.keyword},{}).then(res=>{
      //   if(res.data.meta.status===200){
      //     this.searchItem=res.data.message.goods;
      //       }
      //     })
        //#region 
          // wx.request({
          //   url: 'https://www.zhengzhicheng.cn/api/public/v1/goods/search', //开发者服务器接口地址",
          //   data: {query:this.keyword}, //请求的参数query,
          //   method: 'GET',
          //   success: res => {
          //     // console.log(res);
          //     if(res.data.meta.status===200){
          //     this.searchItem=res.data.message.goods;
          //     // this.hotNum=res.data.message.goods[]
          //     // 下面是获取当前商品的销量
          //     let arr=[];
          //     this.searchItem.forEach((v)=>{
          //      arr.push(v.hot_mumber);
          //     })
          //     this.hotNum=arr;
          //     // console.log(this.hotNum);
          //     }
          //   },
          // });
        //#endregion

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

.tab{
  padding:30rpx 0rpx;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .tab_item{
    text-align: center;
    font-size: 36rpx;
    color:#333;
  }
  .active{
    color:#eb4450;
  }
}


.goods_item{
  background-color: #fff;
  border-bottom: 1px solid #eee;
  padding:30rpx 20rpx;
  display: flex;
  .goods_item_left{
    width:200rpx;
    // height: 140rpx;
    // flex-shrink: 0;    
    image{
      width:200rpx;
      height: 200rpx;
    }
  }
  .goods_item_right{
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left:30rpx;
    .goods_item_title{
      font-size: 32rpx;
      color: #333;
      overflow: hidden;
      white-space: initial;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp:2;
      -webkit-box-orient: vertical;
    }
    .goods_item_price{
      // display: flex;
      color:#eb4450;
      .price{
        font-size: 24rpx;
        margin-right: 6rpx;
      }
    }
  }
}

.loading{
    line-height: 80rpx;
    text-align: center;
    font-size:14px;
    color:#999;
}
</style>
