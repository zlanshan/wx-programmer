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

  </view>
</template>

<script>
import Search from "../../components/search";
import request from "../../utils/request.js";
export default {
  data() {
    return {
      keyword: "",
      tabItem:["综合","销量","价格"],
      tabIndex: 0,
      searchItem:[],
      hotNum:[1,3,5,3,7,2],
      pagenum:1,
      pagesize:20
    }
  },

  methods:{
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

    },
    onLoad(query) {
       // console.log(query);
       this.keyword = query.keyword;
       //  自己封装的函数，参数写全，没有的会设置默认值，request请求和request.get()请求
       request.get("goods/search",{query:this.keyword},{}).then(res=>{
        if(res.data.meta.status===200){
          this.searchItem=res.data.message.goods;
            }
          })
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
      },
      onReachBottom(){
        
      },
};
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
</style>
