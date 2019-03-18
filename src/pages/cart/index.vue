<template><view>
<view class="section">
  <view class="section__title">vertical scroll</view>
  <scroll-view
    scroll-y
    style="height: 200px;"
    bindscrolltoupper="upper"
    bindscrolltolower="lower"
    bindscroll="scroll"
    :scroll-into-view="toView"
    :scroll-top="scrollTop"
  >
    <view id="green" class="scroll-view-item bc_green"></view>
    <view id="red" class="scroll-view-item bc_red"></view>
    <view id="yellow" class="scroll-view-item bc_yellow"></view>
    <view id="blue" class="scroll-view-item bc_blue"></view>
  </scroll-view>

  <view class="btn-area">
    <button size="mini" bindtap="tap">click me to scroll into view</button>
    <button size="mini" bindtap="tapMove">click me to scroll</button>
  </view>
</view>
<view class="section section_gap">
  <view class="section__title">horizontal scroll</view>
  <scroll-view class="scroll-view_H" scroll-x style="width: 100%">
    <view id="green" class="scroll-view-item_H bc_green"></view>
    <view id="red" class="scroll-view-item_H bc_red"></view>
    <view id="yellow" class="scroll-view-item_H bc_yellow"></view>
    <view id="blue" class="scroll-view-item_H bc_blue"></view>
  </scroll-view>
</view>
</view>
</template>
<script>
// const order = ['red', 'yellow', 'blue', 'green', 'red']
// Page({
//   data: {
//     toView: 'red',
//     scrollTop: 100
//   },
//   upper(e) {
//     console.log(e)
//   },
//   lower(e) {
//     console.log(e)
//   },
//   scroll(e) {
//     console.log(e)
//   },
//   tap(e) {
//     for (let i = 0; i < order.length; ++i) {
//       if (order[i] === this.data.toView) {
//         this.setData({
//           toView: order[i + 1]
//         })
//         break
//       }
//     }
//   },
//   tapMove(e) {
//     this.setData({
//       scrollTop: this.data.scrollTop + 10
//     })
//   }
// })
</script>
<style>
scroll-view{
  height: 400rpx;
}
</style>
